const mongoose=require('mongoose');
const Categorie=new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name: 
    { type: String, 
        allowNull:false,
        required: true,
        unique:true
    }
});
module.exports=mongoose.model('Categorie',Categorie);
