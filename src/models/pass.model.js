'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PassSchema = Schema({
    name: String,
    user: String,
    password: String,
    notes: String,
    url: String,
    updatedate: Date,
    favorite: Boolean,
    userid: {type:Schema.Types.ObjectId,ref:'user'},
    folderid: {type:Schema.Types.ObjectId,ref:'folder'},
});

module.exports = mongoose.model('pass', PassSchema);