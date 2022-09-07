'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = Schema({
    description: String,
    userid: {type:Schema.Types.ObjectId,ref:'user'},
});

module.exports = mongoose.model('folder', FolderSchema);