'use strict';

var Pledges = require('../models/pledges.js');

function PledgeHandler () {
	
	function calculateImpactSoFar (result) {
	    for(var i = 0; i < result.length; i++) {
	    	result[i].impactSoFar = 0;
	    	if(result[0].users) {
	    		for(var j = 0; j < result[i].users.length; j++) {
	    			var millisecsDiff = new Date().getTime() - result[i].users[j].when.getTime();
				    result[i].impactSoFar += Math.round(millisecsDiff * result[i].impactPerWeek / (1000 * 60 * 60 * 24 * 7));
	    		}
	    	}
	    }
	    return result;
	}
    
	this.getAllPledges = function (req, res) {
		Pledges.find({ }).exec(function (err, result) { 
		    if (err) { throw err; }
		    res.json(calculateImpactSoFar(result));
		});
	};
	
	this.getPledge = function (req, res) {
		Pledges.findOne({ '_id': req.params.id }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(calculateImpactSoFar([result])[0]);
		});
	};
	
	this.getMyPledges = function (req, res) {
		Pledges.find({ 'users.id': req.user.id }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(calculateImpactSoFar(result));
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
	
	this.searchPledges = function(req, res) {
		var q = req.query.q || "";
		var re = RegExp(q, "i");
		Pledges.find({ 'title': re}).exec(function (err, result) { 	
			res.json(result);
		});
	};
}
module.exports = PledgeHandler;