const express=require('express');
const router =express.Router()
const Categorie=require('../models/Categories');
const categoryController=require('../controllers/CategoryController');
// const mongoose=require('mongoose');

// get deatils of all categories
router.get('/allcategorie',categoryController.allCategorie_get);


//get the addcategorie
router.get('/addcategorie',(req,res)=>{
    res.render('Addcategorie')

});

// add new categories
router.post('/addcategorie',categoryController.addCategory_post);


//edit the category
router.get('/edit/:id',categoryController.editCategory)


// posting updating data of categories
router.post('/update/:id',categoryController.updateCategory);


// delete categories
router.get('/delete/:id',categoryController.deleteCategory)
    

module.exports=router;