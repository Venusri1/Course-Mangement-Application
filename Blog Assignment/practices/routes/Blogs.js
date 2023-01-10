const express=require('express');
const router =express.Router();
const Blogss=require('../models/Allblog');
const Categorie=require('../models/Categories');
const blogController=require('../controllers/BlogController');
const checAuth=require('../middlware/checkauth');
const multer=require('multer');
const fs=require('fs');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);
    }
});

const upload =multer({
    storage:storage,
}).single('images');

// Addblog
router.post('/addblog',upload,blogController.blog_post)


//Allbogs find route for tabler formate

router.get('/allblog',blogController.allblog_get)


//Dashboard routes to read data
router.get('/search',blogController.searchbar)

router.get('/',blogController.dashBoard);



//Admin Dashboard route
router.get('/Admin',blogController.admin_get);

//used to show blog data to user        
router.get('/show/:slug',upload,blogController.show_get);


//editing blogs    
router.get('/edits/:id',blogController.editblog);

 // posting updating data of categories
 router.post('/updates/:id',upload,blogController.updateBlog);
 
//delete the blig data
router.get('/deletes/:id',blogController.deleteBlog);
       

router.get('/addblog',blogController.addblog_get);


module.exports=router;
