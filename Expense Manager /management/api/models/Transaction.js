/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    date:{
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: new Date()
    },
    select:{
      type:'string',
      required:true,
      isIn: ['income', 'expense']
    },
    amount:{
      type:'number',
      required:true
    },
    description:{
      type:'string'
    },
    balance:{
      type:'number',
      defaultsTo: 0
    },
    created:{
      type:'string',
      required:true
    },

    accounts:{
      model:'Account'
    },
  

    
   
  },
datastore:'mongodb',
// tableName: 'our_users'

};

