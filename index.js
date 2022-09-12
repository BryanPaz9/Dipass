'use strict'

const MONGOOSE = require('mongoose');
const APP = require('./app');
const PORT = 3000;
const VERSION = '1.1.2';
const userController = require('./src/controllers/user.controller');
const roleController = require('./src/controllers/role.controller');

MONGOOSE.Promise = global.Promise
// MONGOOSE.set('useFindAndModify', false);
MONGOOSE.connect('mongodb://localhost:27017/Dipass', {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Connection of Tickets DB was sucessful');
    APP.listen(PORT, function (){
        console.log('Server is running on port: '+PORT);
        console.log('Version: '+VERSION);
        roleController.createAdminRole();
        roleController.createUserRole();
        userController.createSA();
    });
}).catch(err => console.log(err));