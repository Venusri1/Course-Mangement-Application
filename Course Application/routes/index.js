const express=require('express');
const router =express.Router();

const { allusers,userform, saveuser, edituser,updateuser,deleteuser}=require('../controllers/coursecontrollers')
router.get('/', allusers)
router.get('/create',userform)
router.post('/create',saveuser)
router.get('/edit/:id',edituser)
router.post('/update/:id',updateuser)
router.get('/delete/:id',deleteuser)

module.exports=router;