'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = Schema({
    description: String,
    active: Boolean,
    userid: {type:Schema.Types.ObjectId,ref:'user'},
});

module.exports = mongoose.model('folder', FolderSchema);