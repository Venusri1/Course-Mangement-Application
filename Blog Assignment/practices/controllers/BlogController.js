const express=require('express');
const router =express.Router();
const Blogss=require('../models/Allblog');
const Categorie=require('../models/Categories');

//adding blog with images
exports.blog_post=(req,res)=>{
      let blogImage;
   if(req.file){
      blogImage=req.file.filename;

   }else{
      blogImage=" ";

   }
   const slugify=req.body.title;
   const slug=slugify.toLowerCase().replace(/ /g, '-')
   .replace(/[^\w-]+/g, '');

   const addblog= new Blogss({
      title:req.body.title,
      name:req.body.name,
      description:req.body.description,
      createAtdate:Date(),
      images:blogImage,
      slug:slug
   })
   console.log(addblog);
   addblog.save((err)=>{
      if(err){
         res.json({message:err.message})
      }else{
         res.redirect('/allblog')
      }
   
   })
}

//editing the blog
exports.editblog=async(req,res)=>{
   const id=req.params.id;
   const allcategories = await Categorie.find().exec()
   Blogss.findById(id).exec()
   .then(updateblog =>{
    res.render('Editblogs',
    { 
       updateblog:updateblog, 
       allcategories:allcategories
   })
    console.log(updateblog);
   })
   .catch(()=>{
      res.redirect('/allblog');
   })
}

//update the blogs
exports.updateBlog=(req,res)=>{
   const id=req.params.id;
  let newimage='';
   if(req.file){
       newimage=req.file.filename;
       try{ 
           fs.unlink("./uploads/"+req.body.oldimage)
       }
       catch(err){
           console.log(err);
       }
      
   }else{
       newimage=req.body.oldimage
   }
   const slugify=req.body.title;
   const slug=slugify.toLowerCase().replace(/ /g, '-')
   .replace(/[^\w-]+/g, '');

    Blogss.findByIdAndUpdate(id,{
       title:req.body.title,
       name: req.body.name,
       description:req.body.description,
       images:newimage,
       slug:slug

    }).exec()
    .then(req.session.message={
        type:'Update Blog',
        message:'Blog was updated'
    })
    .catch((err)=>{
        res.json({message:err.message,type:'danger'})
    });
    res.redirect('/allblog');

    
}

//deleting the blog data
exports.deleteBlog=(req,res)=>{
   const id=req.params.id;
   Blogss.findByIdAndRemove(id)
   .exec()
   .then(
       req.session.message={
                       type:'Delete Blog',
                       message:'Blog was Deleted Successfull'
       })
       .catch(err =>{res.json({message:err.message,type:'danger'})});
       res.redirect('/allblog')
       

   }

//used to show select category in add blogs 
   exports.addblog_get=(req,res)=>{
      Categorie.find()
      .exec()
      .then((allcategorie) =>{
          res.render('Addblog',{
              allcategorie:allcategorie
          });  
      })
      .catch(err=>{
          res.status(404).json({message:err.message})
      })
     
  }

   //used to show the blog details to user
  exports.show_get=(req,res)=>{
   console.log("req.params", req.params);
       const slug=req.params.slug;
       Blogss.find({slug : slug})
       .populate("name")
       .exec((err,bloggs)=>{
           console.log("bloggs", bloggs);
           if(err){
               res.json({messsage:err.message})
           }else{
               res.render('show',{bloggs:bloggs});
           
           }
   })
   }
  
  
//used to render admin
   exports.admin_get=(req,res)=>{
      Blogss.find()  
      .populate("name").sort({
          createAtdate:'desc'
      })
      .exec((err,blogs)=>{
          if(err){
              res.json({messsage:err.message})
          }else{
              res.render('Admin',{blogs:blogs});
          
          }
      })
  }
   
   //user dashboard

  exports.dashBoard=async(req,res)=>{
   try{
       console.log(req.query);
       let search=' ';
       if(req.query){
           search=req.query.search;
       }
       await Blogss.find()  
       .populate("name").sort({
           createAtdate:'desc'
       }) 
       .then((blogs)=>{
           //console.log(blogs);
               res.render('Dashboard',{blogs:blogs});
       })
           
       }
       catch(err){
           console.log(err.message);
       }
   }
  
  //searchbar in user dashboard

   exports.searchbar=async(req,res)=>{
      let search=' ';
      search=req.query.search
      Blogss.find({ $or:[{ title:{$regex: '.*'+search+'.*',$options:'i'}}]}).sort({
          createAtdate:'desc'
      })
      .populate("name")
      .exec((err,blogs)=>{
          if(err){
              res.json({messsage:err.message})
          }else{
              console.log(blogs);
              res.render('Dashboard',{blogs:blogs});
          
          }
      })
  }

   //deetails of all blogs
  exports.allblog_get=(req,res)=>{
   Blogss.find()
   .populate("name")
   .exec((err,blogs)=>{
       if(err){
           res.json({messsage:err.message})
       }else{
           res.render('Allblog',{blogs:blogs});
       
       }
   })
}
