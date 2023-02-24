/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const bcrypt=require('bcrypt');
 const jwt=require('jsonwebtoken');
const {  process } = require("../../config/env/constants");
module.exports = {

    // signup route
    signup:async(req,res)=>{
        const {email,password}=req.body
        const admins =await Admin.find({email:email});
        //email validation
        if(admins.length != 0){
            res.status(400).json({message:'email was exists'})
        }
        else{
            const admin= await Admin.create({email,password}).fetch();
            if(admin){
                res.status(201).json({message:'success'})
            }
            else{
                res.status(404).json({message:'failed to signup'})
            }
        }
    },

    //admin login 
    login:async(req,res)=>{
        const {email,password}=req.body
         //login validation 
        const admin=await Admin.findOne({email:email});
        if(!admin){
            res.status(400).json({message:'invaild email and password'})
        }
        else{
            const token =await jwt.sign({id:admin.id},process.env.JWT_KEY,{
                expiresIn: '22h' // expires in 24 hours
                 });
            console.log(token);
            //storing token in cookie
            const cookie=res.cookie("token",token,{});
            //update the token 
            const tokenupdate=await Admin.update({id:admin.id}).set({token:token});

        //password validation
            const adminlogin =await Admin.find({email:email});
            if(adminlogin){
                if (await bcrypt.compare(password, adminlogin[0].password)) {
                    res.status(200).json({message:'success',token:token,adminlogin:adminlogin})
                  } else {
                    res.status(400).json({message:'invaild password'})
                  }
            }
        }
        
    },
// Admin logout 
    logout:async(req,res)=>{
        const id=req.adminId;
        const token =req.cookies.token;
        const admin=await Admin.findOne({token:token})
        const logout=await Admin.update({id:admin.id}).set({token:null}).exec((err)=>{
            if(err){
                res.status(400).json({message:'logout failed'})
            }else{
                res.clearCookie("token")
                res.status(400).json({message:'logout success',logout:logout})
            }
        });
        
    }
};

