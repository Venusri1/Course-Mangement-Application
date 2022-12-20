var db=require('../models');
const {course}=require('../models/Courses');

const allusers= async (req,res)=>{
    const course1 = await db.course.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await res.render('home',{data:course1})

    // await res.render('home');
}


const userform= async (req,res)=>{
    await res.render('create');
}


const saveuser= async (req,res)=>{
    const{ Coursename, duration, fees } = await req.body;
    const course1 = await db.course.create({
        Coursename ,duration, fees
    }).catch(error=>console.log(error));
console.log(course1)
    await res.redirect('/');

// await res.render('create');
}

const edituser=async(req,res)=>{
    const {id} =await req.params;
 const course1 = await db.course.findOne({
    where:{
        id:id
    },
    raw:true
 }).catch(error=>console.log(error));
    res.render('edit',{data:course1})

}

const updateuser=async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    const selector={
        where:{
            id:id
        }
    }
   await db.course.update(data,selector) .catch(error=>console.log(error));
    res.redirect('/')
}

const deleteuser=async(req,res)=>{
      const {id} =await req.params;
    const course1 = await db.course.destroy({
       where:{
           id:id
       },
       raw:true
    }).catch(error=>console.log(error));
    res.redirect('/');
 
   
 }


module.exports={
    allusers,userform, saveuser,edituser,updateuser,deleteuser
}