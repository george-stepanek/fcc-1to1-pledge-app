'use strict';

var Pledges = require('../models/pledges.js');
var testid = "12345678";

function PledgeHandler () {
	
	function calculateImpactSoFar (req, result) {
	    for(var i = 0; i < result.length; i++) {
	    	result[i].impactSoFar = 0;
	    	if(result[i].users) {
	    		for(var j = 0; j < result[i].users.length; j++) {
	    			var millisecsDiff = new Date().getTime() - result[i].users[j].when.getTime();
				    result[i].impactSoFar += Math.round(millisecsDiff * result[i].impactPerWeek / (1000 * 60 * 60 * 24 * 7));
	    		}
	    		
	    		if(req.user) {
		    		var meIfPledged = result[i].users.filter(function(user) {return user.id == req.user.id;});
		    		if(meIfPledged.length > 0) {
		    			var myMillisecsDiff = new Date().getTime() - meIfPledged[0].when.getTime();
					    result[i].myImpactSoFar = Math.round(myMillisecsDiff * result[i].impactPerWeek / (1000 * 60 * 60 * 24 * 7));
		    		}
	    		}
	    	}
	    	
	    	result[i].prevPledge = result[i > 0 ? i - 1 : result.length - 1].title.toLowerCase().replace(/\s/g, "-");
	    	result[i].nextPledge = result[i < result.length - 1 ? i + 1 : 0].title.toLowerCase().replace(/\s/g, "-");
	    }
	    return result;
	}
    
	this.getAllPledges = function (req, res) {
		Pledges.find({ }).exec(function (err, result) { 
		    if (err) { throw err; }
		    res.json(calculateImpactSoFar(req, result));
		});
	};
	
	this.getPledge = function (req, res) {
		var regex = new RegExp(req.params.title.replace(/-/g, " "), "i");
		Pledges.find({ }).exec(function (err, result) { 
		    if (err) { throw err; }
		    var pledges = calculateImpactSoFar(req, result);
		    res.json(pledges.filter(function (pledge) {	return regex.test(pledge.title) })[0]);
		});
	};

	this.getMyPledges = function (req, res) {
		var id = req.user ? req.user.id : testid;
		Pledges.find({ 'users.id': id }).exec(function (err, result) { 
			if (err) { throw err; } 
			res.json(calculateImpactSoFar(req, result));
		});
	};
	
	this.addMeToPledge = function (req, res) {
		var id = req.user ? req.user.id : testid;
		var user = { id: id, when: new Date() };
		var title = req.params.title.replace(/-/g, " ");
		
		// should check that we're not already signed up ***TODO***
		Pledges.findOneAndUpdate({ 'title': { $regex : new RegExp(title, "i") } }, { $push: { 'users': user } }).exec(function (err, result) { 
			if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.removeMeFromPledge = function (req, res) {
		var id = req.user ? req.user.id : testid;
		var title = req.params.title.replace(/-/g, " ");
		Pledges.findOneAndUpdate({ 'title': { $regex : new RegExp(title, "i") } }, { $pull: { "users" : { id: id } } }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
	
	this.searchPledges = function(req, res) {
		Pledges.find({ 'title': RegExp(req.query.q || "", "i")}).exec(function (err, result) { 	
		    if (err) { throw err; } 
		    res.json(calculateImpactSoFar(req, result));
		});
	};
}
module.exports = PledgeHandler;
