const express = require("express");
const router = express.Router();
const Admins = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const { default: mongoose } = require("mongoose");
const pagesController=require('../controllers/PagesrouteController');

// const Admin=require('../models/Admins');


router.get("/Login", (req, res) => {
  res.render("Login" );
});


//email:abc@gmail.com
// password: abc

//only Admins can login through this route
router.post("/Login", pagesController.login);


router.get('/Logout',pagesController.logout)


module.exports = router;