'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: String,
    fullname: String,
    username: String,
    active: Boolean,
    password: String,
    roleid: {type:Schema.Types.ObjectId,ref:'role'},
    resetpwd: Boolean

});

module.exports = mongoose.model('user', UserSchema);