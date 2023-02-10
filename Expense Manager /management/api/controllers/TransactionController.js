/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //view transaction and member details
  viewtransaction: async (req, res) => {
    const token = req.cookies.token;
    //taking account id to show balance
    const account = await Account.findOne({ id: req.params.id });
    //used for member table to show member details 
    const member = await Usersandaccount.find({
      account: req.params.id,
    }).populate("user");
    //used to show default owner for accounts
    const owner = await User.findOne({ token: token });    
    //view transaction details
    const trans = await Transaction.find({ accounts: req.params.id })
      .sort([{ date: "DESC" }])
      .exec((err, transaction) => {
        if (err) {
          res.status(400).json({ err: "db error" });
        } else {
          res.view("transaction/view", {
            transaction: transaction,
            member: member,
            account: account,
            owner:owner
          });
        }
      });
    console.log(trans);
  },

  addtransaction: async function (req, res) {
    const account = await Account.findOne({ id: req.params.id });
    const user = await Transaction.find({});
    //used for created by field to show default owner
    const token = req.cookies.token;
    const owner = await User.findOne({ token: token });


    return res.view("transaction/addtransaction", {
      user: user,
      account: account,
      owner:owner
    });
  },
//add transaction 
  trans: async (req, res) => {
    let { amount, description, date, select, created } = req.body;
    const accounts = await Account.findOne({ id: req.params.id });
  
    balance=accounts.balance
    // select the type of transaction
    if (req.body.select === "income") {
      balance += parseInt(amount);
      const transaction = await Transaction.create({
        amount: amount,
        description: description,
        date: date,
        select: select,
        balance: balance,
        accounts: accounts.id,
        created: created,
      }).exec((err) => {
        if (err) {
          console.log(err);
          req.addFlash('delete', 'invaild Transaction ');
        } else {
          req.addFlash('success', 'Transaction was Added Succesfully');
          res.redirect("/transaction/" + accounts.id);
        }
      });
     //update balance in account after transaction
      const id=req.params.id
      const accountbalance=await Account.update(id,{balance:balance});
      console.log(accountbalance);
  
      console.log(transaction);

    } else {
      balance -= parseInt(amount);
      if(balance >= 0){
        const transaction = await Transaction.create({
          amount: amount,
          description: description,
          date: date,
          select: select,
          balance: balance,
          accounts: accounts.id,
          created: created,
        }).exec((err) => {
          if (err) {
            console.log(err);
            req.addFlash('delete', 'invaild Transaction ');
          } else {
            req.addFlash('success', 'Transaction was Added Succesfully');
            res.redirect("/transaction/" + accounts.id);
          }
        });
         //update balance in account after transaction
        const id=req.params.id
        const accountbalance=await Account.update(id,{balance:balance});
        console.log(accountbalance);
    
        console.log(transaction);
      }
      else{
        req.addFlash('delete', 'Low balance ');
        res.redirect("/transaction/" + accounts.id);
      }
    }

 
  },

  edit: async (req, res) => {
    
    const transactiontype = await Transaction.find({});
  //used to show default owner for accounts 
    const tokens = req.cookies.token;
    const owner = await User.findOne({ token: tokens });
    console.log("owner", owner.firstname);

  //finding transaction and updating
    await Transaction.findOne({ id: req.params.id }).exec(
      async(err, transaction) => {
        if (err) {
          res.status(400).json({ err: "db error" });
        }
        res.view("transaction/edittransaction",
         { 
          transaction: transaction ,
          transactiontype:transactiontype,
          owner:owner
        });
      });
  },

  //update transaction
  updatetransaction: async (req, res) => {
    let { amount, description, date, select, created } = req.body;
    const transactionaccount=await Transaction.findOne({id:req.params.id});
    const useraccount =await Account.findOne({id:transactionaccount.accounts});
    //calculating for balance and amount
    const oldamount=transactionaccount.amount
    const updatedamount=oldamount - amount;
    console.log("updatedamount",updatedamount);
   // updating balance from old balance
    const balanceupdate=useraccount.balance
    console.log("bala",balanceupdate);

    //updating income 
    if (req.body.select === "income") {
      balance = balanceupdate - parseInt(updatedamount);
      if(balance >=0){
        const id = req.params.id;
    const updatetransaction = await Transaction.update(id, {
      amount: amount,
      description: description,
      date: date,
      select: select,
      created: created,
      balance: balance,
    }).exec(async(err) => {
      if (err) {
        console.log(err);
        req.addFlash('delete', 'invaild Transaction ');
      } else {
        req.addFlash('success', 'Transaction was updated Succesfully');
        res.redirect("/transaction/" + transactionaccount.accounts);
      }
    });

    const accountbalance=await Account.update(transactionaccount.accounts,{balance:balance});
    console.log(accountbalance);
    console.log(updatetransaction);
      }else{
        //validation for balance 
        req.addFlash('delete', 'Low balance for income and transaction failed');
        res.redirect("/transaction/" + transactionaccount.accounts);
      }
    } else {
      balance = balanceupdate + parseInt(updatedamount);
      if(balance >=0){
        const id = req.params.id;
    const updatetransaction = await Transaction.update(id, {
      amount: amount,
      description: description,
      date: date,
      select: select,
      created: created,
      balance: balance,
    }).exec(async(err) => {
      if (err) {
        console.log(err);
        req.addFlash('delete', 'invaild Transaction ');
      } else {
        req.addFlash('success', 'Transaction was updated Succesfully');
        res.redirect("/transaction/" + transactionaccount.accounts);
      }
    });
//update balance in account after transaction
    const accountbalance=await Account.update(transactionaccount.accounts,{balance:balance});
    console.log(accountbalance);
    console.log(updatetransaction);

      }else{
        //validation for balance 
        req.addFlash('delete', 'Low balance for expense and transaction failed');
        res.redirect("/transaction/" + transactionaccount.accounts);
      }
    } 
  },

  //delete transaction
  deletetrasnsaction: async (req, res) => {
    //taking account balance and updating balance while deleting transactions
    const account=await Transaction.findOne({id:req.params.id});
    const user=await Account.findOne({id:account.accounts})
    const balanceupdate=user.balance
    const amount=account.amount
    balance=balanceupdate
    if (account.select === "income") {
      balance -= parseInt(amount);
      if(balance >= 0){
        const accountbalance=await Account.update(account.accounts,{balance:balance});
        console.log(accountbalance);
    
        await Transaction.destroy({ id: req.params.id }).exec(async(err) => {
          if (err) {
            req.addFlash('delete', 'invaild Transaction ');
          }
          req.addFlash('success', 'Transaction was Deleted');
          res.redirect("/transaction/" + account.accounts);
        });
      }else{
        //balance validation
        req.addFlash('delete', 'transaction failed because of low balance');
        res.redirect("/transaction/" + account.accounts);

      }

    } else {
      balance += parseInt(amount);
      const accountbalance=await Account.update(account.accounts,{balance:balance});
    console.log(accountbalance);

    await Transaction.destroy({ id: req.params.id }).exec(async(err) => {
      if (err) {
        req.addFlash('delete', 'invaild Transaction ');
      }
      req.addFlash('success', 'Transaction was Deleted');
      res.redirect("/transaction/" + account.accounts);
    });
    }
  },
};
