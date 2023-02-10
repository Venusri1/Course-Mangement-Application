/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    accountname:{
      type:'string',
      required:true,
    },
    balance:{
      type:'number'
    },
    members:{
      collection: 'User',
      via:'account',
      through: 'Usersandaccount'
    },
    useraccounts:{
      model:'User'
    }

    
  },
  datastore:'mongodb'

};

