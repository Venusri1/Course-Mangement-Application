/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const nodemailer = require("nodemailer");
 const jwt=require('jsonwebtoken');


 
 module.exports = {
 //signup page
   signup: (req, res) => {
     res.view("pages/signup");
   },
 
   //adding new user 
   add: async (req, res) => {
    //validation for email was existed or not
    const signup= await User.find({email:req.body.email});
    if(signup.length != 0){
      req.addFlash('failed', 'Email was already exists');
      return res.view("pages/signup");
    }
    else{
      //adding new user
        const { firstname,lastname, email, password } = req.body;
     console.log(req.body);
     let data = await User.create({ firstname,lastname, email, password }).fetch()
       if (data) {
         console.log("data", data);
         res.redirect("/login");
         //creating default account 
         const users=await User.findOne({email:email});
         const account= await Account.create({accountname:users.firstname,useraccounts:users.id}).fetch()
         console.log(account);
        //creatinf default owner
         role="owner"
        const member = await Usersandaccount.create({user: users.id,role:role}).fetch();
        console.log(member);
   //send mail upon successfull signup    
       const mail= async ()=>{
        var transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "4584a752763861",
            pass: "47d090013c05f1"
          }
        });
        let sendmail= await transport.sendMail({
          from:'avvenusri22@gmail.com',
          to:req.body.email,
          subject:"welcome",
          text:'welcome to expense manager'
      
      })
        console.log("Message sent: %s", sendmail.messageId);
        
      }    
      mail().catch(console.error); 
       } else {
        req.addFlash('failed', 'Failed to signup');
      return res.view("pages/signup")
       }    
    }
   },
 };