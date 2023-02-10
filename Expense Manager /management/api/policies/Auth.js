const jwt=require('jsonwebtoken');

//Authenation routes using token 
module.exports= async(req,res,next)=>{
  
    const token = req.cookies.token;
    console.log("token",token);
  try {
    const validation = jwt.verify(token, "secert");
    // console.log(validation);
    
    // req.userId = data.id;
    // req.userRole = data.role;
    return next();
  } catch(error) {
    return res.redirect("/login");
  }


};


	


