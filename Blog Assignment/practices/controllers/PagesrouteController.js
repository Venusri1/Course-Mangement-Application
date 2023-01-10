const express = require("express");
const router = express.Router();
const Admins = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const { default: mongoose } = require("mongoose");

//admin login
exports.login=(req, res) => {
    Admins.find({ emailId: req.body.emailId})
      .exec()
      .then((user) => {
        if (user.length < 1) {
          req.session.message={
                  message: "Incorrect email id and password",
                };
          return res.redirect('/Login')
        }
        
        bcrypt.compare(req.body.password, user[0].password,async (err, result) => {
          if (err) {
              req.session.message={
                message: "Incorrect email id and password",
                };
          }
          if (result) {
            const token = jwt.sign({
              emailId:user[0].emailId,
              password:user[0].password,
              _id:user[0]._id
            }, 
              "secert");
            console.log(token);
            const userver=jwt.verify(token,"secert");
            console.log(userver);
  
            let admintoken= await Admins.updateOne({_id:user[0]._id},{ $set:
              {token: token}
            })
            console.log(admintoken);
  
             res.redirect('/Admin')
    
          }
      
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  
  
  }

//admin logout
  exports.logout=async(req,res)=>{
    const user=await Admins.find().exec()
    let data= await Admins.findByIdAndUpdate({_id:user[0]._id},{ $set:
      {token: null}
    })
    console.log(data);
  
    res.redirect('/Login')
  }

//used to create admin


  // router.post("/Login", (req, res) => {
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({
//         error: err,
//       });
//     } else {
//       const user = new Admins({
//         emailId: req.body.emailId,
//         password: hash,
//       });
//       // user.createToken=async function(){
//       //   try{
//       //     const token = await jwt
//       //   }
//       // }
//       user
//         .save()
//         .then((result) => {
//           console.log(result);
//           res.status(201).json({
//             message: "User created",
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({
//             error: err,
//           });
//         });
//     }
//   });
// });

