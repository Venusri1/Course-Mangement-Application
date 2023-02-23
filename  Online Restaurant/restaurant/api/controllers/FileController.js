/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //used to upload image file
    upload:async(req,res)=>{
        let files = req.file('file');
        // console.log("files", files);
        console.log(process.env.BASE_PATH);
        let file= await files.upload({
            dirname:'/Users/ztlab85/Documents/pp/uploads'
        },
            (err,file)=>{
            if(err){
                console.log(err);
            }
            console.log(file);
            res.status(200).json({message:'success',file})
            
        })
        // console.log(file);

    }
};

