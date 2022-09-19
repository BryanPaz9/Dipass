'use strict'

var express = require('express');
const passController = require('../controllers/pass.controller');
var api = express.Router();

api.post('/pass/create',passController.create);
api.get('/pass/get',passController.get);
api.get('/pass/getbyid/:id', passController.getById);
api.put('/pass/update/:id',passController.update);
api.put('/pass/activate/:id',passController.activate);
api.put('/pass/deactivate/:id',passController.deactivate);

module.exports =api;