'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pledge = new Schema({
	title: String,
	explanation: String,
	impactPerWeek: Number,
	impactUnits: String,
	source: String,
	citation: String,
	imageUrl: String,
	smallImageUrl: String, // thumbnail
	user: {
	    id: String,
	    when: Date
	}
});

module.exports = mongoose.model('Pledge', Pledge);
