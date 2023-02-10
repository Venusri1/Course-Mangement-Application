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

  '/': { view: 'pages/homepage' },
  'GET /signup': "UserController.signup",
  'POST /signup': "UserController.add",
  'GET /login': "LoginController.login",
  'POST /login':"LoginController.loginpost",
  'GET /logout':"LoginController.logout",

  'GET /account':"AccountController.account",
  'POST /account':"AccountController.addaccount",
  'GET /editaccount/:id':"AccountController.editAccount",
  'POST /updateaccount/:id':"AccountController.updateaccount",
  'GET /delete/:id':"AccountController.deleteaccount", 

  'GET /transaction/:id':"TransactionController.viewtransaction",
  'GET /addtransaction/:id':"TransactionController.addtransaction",
  'POST /addtran/:id':"TransactionController.trans",

  'GET /edittransaction/:id':"TransactionController.edit",
  'POST /update/:id':"TransactionController.updatetransaction",
  'GET /deletetrasnsaction/:id':"TransactionController.deletetrasnsaction",

  // 'GET /transaction':"TransactionController.member",
  'POST /memberdetails/:id':"MembersController.details",
  'GET /deletemem/:id':"MembersController.deletemem"




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
