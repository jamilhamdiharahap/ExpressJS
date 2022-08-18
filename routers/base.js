const express = require('express');
const controller = require('../controllers/index');
const route = express.Router();
const authorization = require('../authentication/auth');


route.post('/api/user/signup',controller.users.singUp);
route.post('/api/user/signin',controller.users.singIn);

route.post('/api/shopping',authorization,controller.shopping.create);
route.get('/api/shopping',authorization,controller.shopping.getAll);
route.get('/api/shopping/:id',authorization,controller.shopping.getById);
route.put('/api/shopping/:id',authorization,controller.shopping.update);
route.delete('/api/shopping/:id',authorization,controller.shopping.delete);



module.exports = route;