'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	id: String,
	displayName: String,
	emailAddress: String,
	isCurrentUser: Boolean
});

module.exports = mongoose.model('User', User);
