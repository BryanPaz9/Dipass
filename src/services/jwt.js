'use strict'

var jwt  = require('jwt-simple');
var moment = require('moment');
var secret = 'f4$sT5x';

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        email: user.email,
        fullname: user.fullname,
        username: user.username,
        active: user.active,
        password: user.password,
        roleid: user.roleid,
        resetpwd: user.resetpwd,
        iat: moment().unix(),
        exp: moment().add(1,'days').unix()

    }
    return jwt.encode(payload,secret);
}