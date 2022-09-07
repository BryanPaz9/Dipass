'use strict'

var express = require('express');
const userController = require('../controllers/user.controller');
const md_auth = require('../middlewares/auth')
var api  = express.Router();

// GET
api.post('/user/new-admin',userController.createUserByAdmin);
// api.get('/user/:id',md_auth.ensureAuth, userController.getUserById);
// api.get('/userbyarea/:area',userController.getUserByArea);

// //POST
// api.post('/user/create',md_auth.ensureAuth,userController.createUserByAdmin);

// //PUT
// api.put('/user/edit/:id',md_auth.ensureAuth,userController.updateUser);

// //DELETE
// api.delete('/user/delete/:id',md_auth.ensureAuth,userController.deleteUser);

module.exports = api;