const jwt=require('jsonwebtoken');

//Authenation routes using token 
module.exports= async(req,res,next)=>{
  
    const token =req.cookies.token;
    console.log("token",token);
  try {
    //token validation
    const validation = jwt.verify(token,"secret");
     console.log("validation id",validation.id);
     req.adminId=validation.id;
     console.log("id",req.adminId);
    return next();
  } catch(error) {
    return res.status(401).json({message:'Auth failed'});
  }



};


	