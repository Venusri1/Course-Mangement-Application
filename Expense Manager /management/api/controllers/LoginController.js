/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {

  //get route for login page
  login: (req, res) => {
    res.view("pages/login");
  },

  //enter email id and password

  //email:- abc@gmail.com   password:Abc@1234
  //email:-venusri@gmail.com  password:Venusri1234

  loginpost: async (req, res) => {
    const { email, password } = req.body;

    //finding email id from user signup databse
    const users=await User.findOne({email:email});
    if(!users){
      req.addFlash("emailfailed", "Invaild email id");
      req.addFlash("passwordfailed", "Invaild password");
      return res.view("pages/login");

    }else{
    
      //generating token in user login
    const id=users.id;
    const token = jwt.sign({id:id }, "secert");

    const data = await User.update({ email:email }).set({
      token: token,
    });

    const cookie=res.cookie("token",token,{});
    // console.log(cookie);

 //password validation
    const login = await User.findOne({ email: email, data: data });
    if (login) {
      if (await bcrypt.compare(req.body.password, login.password)) {
        res.redirect("/account");
      } else {
        req.addFlash("password", "Invaild password id");
        return res.view("pages/login");
      }
      console.log("data", login);
    } else {
      req.addFlash("failed", "Invaild email id");
      req.addFlash("password", "Invaild password");
      return res.view("pages/login");
    }
  }
  },

  //logout
  logout: async (req, res) => {
    const user = await User.find();
    const token = await User.update({ email: user.email }).set({ token: null });
    res.clearCookie('token');
    // console.log(token);
    res.redirect("/login");
  },
};
