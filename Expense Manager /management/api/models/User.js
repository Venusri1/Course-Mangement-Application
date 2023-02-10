/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt=require('bcrypt');

 module.exports = {
  
  attributes: {
    firstname:{
      type:'string',
      required: true,
    },
    lastname:{
      type:'string',
      required: true,
    },
    email:{
      type: 'string',
      unique: true,
      required: true,
    },
    password:{
      type:'string',
      required:true,
      minLength:8,
    },
    accounts:{
      collection:'Account',
      via:'user',
      through: 'Usersandaccount'
    }
  
  },
  beforeCreate: (value, next) => {
    bcrypt.hash(value.password, 10, (err, hash) => 
    {
      if (err){
        throw new Error(err);
      }
      value.password = hash;
      next();
    })
  },

  datastore:'mongodb',
  
 

  

};
