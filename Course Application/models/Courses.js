var Sequelize = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const course=sequelize.define('Courses',{
        id:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Coursename:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        duration:{
            type:DataTypes.STRING,
            defaultValue:'test',
            allowNull:false,
            unique:true
        },
        fees:{
            type:DataTypes.STRING,
                allowNull:false,
                unique:true
        }
    },{
        timestamps:false

    });
    return course;
        
}