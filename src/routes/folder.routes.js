'use strict'

var express = require('express');
const folderController = require('../controllers/folder.controller');
var api = express.Router();

api.post('/folder/create',folderController.create);
api.get('/folders/',folderController.get);
api.put('/folder/update/:id',folderController.update);
api.put('/folder/activate/:id',folderController.activate);
api.put('/folder/deactivate/:id',folderController.deactivate);

module.exports = api;