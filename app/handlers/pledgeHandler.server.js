'use strict';

var Pledges = require('../models/pledges.js');

function PledgeHandler () {
    
	this.getAllPledges = function (req, res) {
		Pledges.find({ }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.getPledge = function (req, res) {
		Pledges.findOne({ '_id': req.params.id }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.getMyPledges = function (req, res) {
		Pledges.find({ 'users.id': req.user.id }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.addMeToPledge = function (req, res) {
		var user = { id: req.user.id, when: new Date() };
		Pledges.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'users': user } }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.removeMeFromPledge = function (req, res) {
		Pledges.findOneAndUpdate({ '_id': req.params.id }, { $pull: { "users" : { id: req.user.id } } }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
}
module.exports = PledgeHandler;