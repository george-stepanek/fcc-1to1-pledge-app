'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pledge = new Schema({
	title: String,
	category: String,
	explanation: String,
	impactPerWeek: Number,
	impactSoFar: Number,
	myImpactSoFar: Number,
	impactUnits: String,
	source: String,
	citation: String,
	imageUrl: String,
	thumbnailUrl: String,
	prevPledge: String,
	nextPledge: String,
	prevUrl: String,
	nextUrl: String,
	users: [ {
	    id: String,
	    when: Date
	} ],
	userCount: Number
});

module.exports = mongoose.model('Pledge', Pledge);
