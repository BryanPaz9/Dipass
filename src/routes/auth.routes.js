'use strict'

var express = require('express');
const authController = require('../controllers/auth.controller');
var api = express.Router();

api.post('/auth/login',authController.logIn);
api.post('/auth/signup',authController.signUp);

module.exports = api;