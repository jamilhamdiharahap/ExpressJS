const user = require('./users/user.js');
const shopping = require('./shopping/shopping');
const controller = {};

controller.users = user;
controller.shopping = shopping;


module.exports = controller;