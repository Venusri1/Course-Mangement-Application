/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



const jwt = require("jsonwebtoken");

module.exports = {

  //view account page 
  account:async(req,res)=>{
    const token=req.cookies.token;

    //used to find specific account using token
    const account= await User.findOne({token:token});
    console.log(account);
    
    //finding user id from token 
     await Account.find({useraccounts:account.id}).exec((err,account)=>{
      if(err){
        res.status(400).send({ err: "db error" });
      }
      res.view('account/Account',{account:account})
    });
  },

  // add account
  addaccount:async function(req,res){
    const token=req.cookies.token;
    const accountname=req.body.accountname;

    //finding if accountname was present user or not
    const users=await User.findOne({token:token});

    const name= await Account.find({useraccounts:users.id,accountname:accountname});
    if(name.length != 0){
      req.addFlash('invalid', 'Account name was already exists');
      return res.redirect('/account');

    }else{

      //adding  account 
      const account= await Account.create({accountname:accountname,useraccounts:users.id}).exec(err=>{
        if(err){
          req.addFlash('success', 'Account was exists');
          return res.redirect('/account');
          
        }else{
          req.addFlash('success', 'Account was added Successful');
          return res.redirect('/account');
        }
      })
      console.log(account);

    }
    console.log(name);

      
  },
  
  //edit  account name
  editAccount:async(req,res)=>{
    await Account.findOne({id:req.params.id}).exec((err,account)=>{
      if(err){
        res.status(400).send({ err: "db error" });
      }
      res.view('account/Editaccount',{account:account})
    })
  },

  //update account name
  updateaccount:async(req,res)=>{
    const id=req.params.id
    const{accountname}=req.body
    await Account.update(id,{accountname:accountname}).exec((err)=>{
      if(err){
        
        res.status(400).send({ err: "db error" });
      }
      req.addFlash('success', 'Account was Update Successful');
        res.redirect('/account')

    })

  },

  //delete account name
  deleteaccount:async function(req,res){
    await Account.destroy({id:req.params.id}).exec((err)=>{
      if(err){
        res.status(400).send({ err: "db error" });
      }
      req.addFlash('success', 'Account was Deleted');
      res.redirect('/account')
    })
    
  }

};

