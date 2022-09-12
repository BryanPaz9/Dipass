'use strict'

var express = require('express');
const userController = require('../controllers/user.controller');
const md_auth = require('../middlewares/auth')
var api  = express.Router();

// GET
api.post('/users/new-admin',md_auth.ensureAuth,userController.createUserByAdmin);
api.post('/users/deactivate/:id',md_auth.ensureAuth,userController.deactivateByAdmin);
api.post('/users/activate/:id',md_auth.ensureAuth,userController.activateByAdmin);
api.get('/user/:id',md_auth.ensureAuth, userController.getById);
api.get('/users/name/:name',md_auth.ensureAuth, userController.getByName);
api.get('/users/',md_auth.ensureAuth,userController.get);
api.put('/users/update/:id', md_auth.ensureAuth,userController.update);
api.put('/users/update-admin/:id',md_auth.ensureAuth,userController.updateByAdmin);

module.exports = api;