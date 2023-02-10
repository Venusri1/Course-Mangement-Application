/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' }, //home page
  'GET /signup': "UserController.signup", //get route for signup
  'POST /signup': "UserController.add", //post route for signup
  'GET /login': "LoginController.login", //get route login
  'POST /login':"LoginController.loginpost", //post route login
  'GET /logout':"LoginController.logout", // get route logout

  'GET /account':"AccountController.account",  //get route for account
  'POST /account':"AccountController.addaccount", //post route for account
  'GET /editaccount/:id':"AccountController.editAccount", //get route to edit account name
  'POST /updateaccount/:id':"AccountController.updateaccount",  //post route to update account name
  'GET /delete/:id':"AccountController.deleteaccount", //get route to delete account name

  'GET /transaction/:id':"TransactionController.viewtransaction", //get route for transaction and member
  'GET /addtransaction/:id':"TransactionController.addtransaction", //get transaction page
  'POST /addtran/:id':"TransactionController.trans", //post route to add transaction 

  'GET /edittransaction/:id':"TransactionController.edit", //edit transaction
  'POST /update/:id':"TransactionController.updatetransaction", //update trsanction by post route
  'GET /deletetrasnsaction/:id':"TransactionController.deletetrasnsaction", //get route for delete route 

 
  'POST /memberdetails/:id':"MembersController.details", //post route for members
  'GET /deletemem/:id':"MembersController.deletemem" // get route to delete members




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
