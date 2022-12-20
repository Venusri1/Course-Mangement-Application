const {Sequelize,DataTypes} =require('sequelize');
const sequelize = new Sequelize('learn','root','venusri22',{
    host:'localhost',
    dialect:'mysql',
    logging:true,
    pool:{max:5,min:0,idle:10000}
});
sequelize.authenticate()
.then(()=>{
    console.log('connected');  
})
.catch(err=>{
    console.log('err'+err)
});

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re sync");
})
// db.users=require('./users')(sequelize,DataTypes);
db.course=require('./Courses')(sequelize,DataTypes);
module.exports = db;