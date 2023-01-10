const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(
            token
        );
        const decode=jwt.verify(token,"secert");
        req.user=decode;
        next()

    }catch{
        req.session.message={
            message: "Incorrect password and emailid",
          };
    }
 
   
}

