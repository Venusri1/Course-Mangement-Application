/**
 * MembersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

;

 module.exports = {

  // add members only
  details: async (req, res) => {
    const token = req.cookies.token;
    const user = await User.findOne({ email: req.body.email });
    const account = await Account.findOne({ id: req.params.id });
    const memberaccount=await Usersandaccount.find({account:account.id})
    
    //validation for  user
    if (!user) {
      req.addFlash("invalid", "Invaild email id");
      return res.redirect("/transaction/" + account.id);
    } else{
      //validation for account id
      if(!memberaccount){
        req.addFlash("invalid", " email id");
        res.redirect("/transaction/" + account.id);
      }
      //validation for owner exists
      if(user.token == token){
        req.addFlash("invalid", "Owner was already exists");
        res.redirect("/transaction/" + account.id);
      }
      //checking member validation and if member not present then add member 
      const member=await Usersandaccount.find({user:user.id,account:account.id})   
      if(member.length !=0){
        req.addFlash("invalid", 'Member was exists already');
        res.redirect("/transaction/" + account.id);
      } 
      else{
        role = "member"
        const member = await Usersandaccount.create({user: user.id,account: account.id,role:role}).fetch();
            if (member) {
              req.addFlash("valid", 'Member was Added successfully');
              res.redirect("/transaction/" + account.id);
            } else {
              req.addFlash("invalid", "Invaild email exists");
            return res.redirect("/transaction/" + account.id);
            }   
      }
    }    
  },

  //deleting member
  deletemem: async (req, res) => {
    const accounts = await Usersandaccount.findOne({ id: req.params.id });
    await Usersandaccount.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        req.addFlash("invalid", "Invaild transaction");
       
      } else {
        req.addFlash('valid', 'Member was Deleted');
        res.redirect("/transaction/" + accounts.account);
      }
    });
  },
};
