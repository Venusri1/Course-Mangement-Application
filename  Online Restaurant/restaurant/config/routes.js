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

  // '/': { view: 'pages/homepage' },
  'POST /signup':'AdminController.signup',
  'POST /login':'AdminController.login',
  'POST /logout':'AdminController.logout',
   
  'GET /category':'CategoryController.category',
  'POST /addcategory':'CategoryController.addcategory',
  'GET /category/:id':'CategoryController.editcategory',
  'POST /category/:id':'CategoryController.updatecategory',
  'DELETE /category/:id':'CategoryController.deletecategory',
  
  'GET /items':'ItemsController.items',
  'POST /additems':'ItemsController.additems',
  'GET /items/:id':'ItemsController.editItems',
  'POST /items/:id':'ItemsController.updateItems',
  'DELETE /items/:id':'ItemsController.deleteitem',
  
  'GET /menu': 'CategoryController.menu',
  'POST /file':'FileController.upload',





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