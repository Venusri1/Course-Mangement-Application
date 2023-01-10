const mongoose=require('mongoose');

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    name: { type:mongoose.Schema.Types.ObjectId,ref:'Categorie',required:true },
    description:{
        type:String,
        required:true
    },
    images:{
        type:String
    },
    createAtdate:{
        type:Date,
        required:true,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    
    }

});

module.exports=mongoose.model('Blogss',blogSchema);