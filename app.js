'use strict'
const BP = require('body-parser');
const EXPRESS = require('express');
const APP = EXPRESS();
const cors = require('cors')
var user_routes = require('./src/routes/user.routes');
// var department_routes = require('./src/routes/department.routes');
// var ticket_routes = require('./src/routes/ticket.routes');
// var auth_routes = require('./src/routes/auth.routes');

APP.use(cors());

APP.use(BP.urlencoded({extended:false}));
APP.use(BP.json());

APP.use('/api/v1',user_routes);
module.exports = APP;