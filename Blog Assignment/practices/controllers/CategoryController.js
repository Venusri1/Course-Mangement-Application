const express=require('express');
const router =express.Router()
const Categorie=require('../models/Categories');

//allcategor controller
exports.allCategorie_get=(req,res)=>{
    Categorie.find()
    .exec()
    .then((allcategorie) =>{
        res.render('Allcategories',{
            allcategorie:allcategorie
        });  
    })
    .catch(err=>{
        res.status(404).json({message:err.message})
    })
    
}

//used to add category
exports.addCategory_post=(req,res)=>{
    // console.log("req", req.body);
    const addCategorie = new Categorie({
        name: req.body.name
    })
    console.log(addCategorie )
    addCategorie
    .save()  
    .then(req.session.message={
        type:'Categorie adding',
        message:'Add Categorie'
    })
    .catch(err=>
        {res.json({message:err.message,type:'danger'})
    })

    res.redirect('/allcategorie');
}

//editing the category
exports.editCategory=(req,res)=>{
    const id=req.params.id;
    Categorie.findById(id).exec()
    .then(updatecategory =>{
     res.render('Editcategory',{ updatecategory:updatecategory})
 
    })
    .catch(()=>{
       res.redirect('/allcategorie');
    })
 }


//updating the category
 exports.updateCategory=(req,res)=>{
    const id=req.params.id;
    Categorie.findByIdAndUpdate(id,{
        name:req.body.name
    })
    .then(req.session.message={
        type:'Update Categorie',
        message:'Categorie was updated'
    })
    .catch((err)=>{
        res.json({message:err.message,type:'danger'})
    });
    res.redirect('/allcategorie')
}

 //delete the category
exports.deleteCategory=(req,res)=>{
    const id=req.params.id;
    Categorie.findByIdAndRemove(id)
    .exec()
    .then(
        req.session.message={
                        type:'Delete Categorie',
                        message:'Categorie was Deleted Successfull'
        })
        .catch(err =>{res.json({message:err.message,type:'danger'})});
        res.redirect('/allcategorie')

}
