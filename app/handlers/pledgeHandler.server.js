'use strict';

var Pledges = require('../models/pledges.js');
var testid = "12345678";

function PledgeHandler () {
	
	function populateCalculatedProperties (req, results) {
		var output = results.sort(function(a, b) {
			if(a.category != b.category) {
				return a.category > b.category ? 1 : -1;
			}
			else {
				if(a.title != b.title) {
					return a.title > b.title ? 1 : -1;
				}
				else {
					return 0;
				}
			}
		});
		
	    for(var i = 0; i < output.length; i++) {
	    	output[i].impactSoFar = 0;
	    	if(output[i].users) {
	    		for(var j = 0; j < output[i].users.length; j++) {
	    			var millisecsDiff = new Date().getTime() - output[i].users[j].when.getTime();
				    output[i].impactSoFar += Math.round(millisecsDiff * output[i].impactPerWeek / (1000 * 60 * 60 * 24 * 7));
	    		}
	    		
	    		// drop all other user data from the pledge, for reasons of security and scalability
	    		if(req.user) {
		    		var meIfPledged = output[i].users.filter(function(user) {return user.id == req.user.id;});
		    		if(meIfPledged.length > 0) {
		    			var myMillisecsDiff = new Date().getTime() - meIfPledged[0].when.getTime();
					    output[i].myImpactSoFar = Math.round(myMillisecsDiff * output[i].impactPerWeek / (1000 * 60 * 60 * 24 * 7));
		    		}
		    		output[i].users = meIfPledged;
	    		}
	    		else {
	    			output[i].users = [];
	    		}
	    	}
	    	
	    	output[i].prevPledge = output[i > 0 ? i - 1 : output.length - 1].title.toLowerCase().replace(/\s/g, "-");
	    	output[i].nextPledge = output[i < output.length - 1 ? i + 1 : 0].title.toLowerCase().replace(/\s/g, "-");
	    	output[i].prevUrl = output[i > 0 ? i - 1 : output.length - 1].imageUrl;
	    	output[i].nextUrl = output[i < output.length - 1 ? i + 1 : 0].imageUrl;
	    }
	    return output;
	}

	this.getPledge = function (req, res) {
		// first need to get all of the pledges, so we can populate the prevPledge and nextPledge properties
		Pledges.find({ }).exec(function (err, results) { 
		    if (err) { throw err; }
			var regex = new RegExp(req.params.title.replace(/-/g, " "), "i");
			var pledges = populateCalculatedProperties(req, results);
			// return only the requested pledge
		    res.json(pledges.filter(function (pledge) {	return regex.test(pledge.title) })[0]);
		});
	};

	this.getMyPledges = function (req, res) {
		var id = req.user ? req.user.id : testid;
		Pledges.find({ 'users.id': id }).exec(function (err, results) { 
			if (err) { throw err; } 
			res.json(populateCalculatedProperties(req, results));
		});
	};
	
	this.addMeToPledge = function (req, res) {
		var id = req.user ? req.user.id : testid;
		var user = { id: id, when: new Date() };
		var title = req.params.title.replace(/-/g, " ");
		
		// check that we're not already signed up for this pledge
		Pledges.find({ $and: [{'users.id': id}, {'title': { $regex : new RegExp(title, "i") } }] }).exec(function (err, result) {
			if (err) { throw err; }
			if(result.length == 0) {
				Pledges.findOneAndUpdate({ 'title': { $regex : new RegExp(title, "i") } }, { $push: { 'users': user } }).exec(function (err, result) { 
					if (err) { throw err; } 
				    res.json(result);
				});
			}
			else {
				res.json(result);
			}
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
		Pledges.find({ 'title': RegExp(req.query.q || "", "i") }).exec(function (err, results) { 	
		    if (err) { throw err; } 
		    res.json(populateCalculatedProperties(req, results));
		});
	};
	
	this.getCategories = function(req, res) {
		Pledges.distinct('category', function(err, results) {
		    if (err) { throw err; }
		    var categories = results.sort();
			Pledges.find({ }).exec(function (err, results) { 
			    if (err) { throw err; }
			    var output = [];
				for(var i = 0; i < categories.length; i++) {
					var url = results.filter(function (value) { return value.category == categories[i]})[0].thumbnailUrl;
					output.push({ title: categories[i], imageUrl: url });
				}
		    	res.json(output);
			});
		});
	};
	
	this.getPledgesForCategory = function(req, res) {
		Pledges.find({ 'category': req.params.category }).exec(function (err, results) { 	
		    if (err) { throw err; } 
		    res.json(populateCalculatedProperties(req, results));
		});	
	};
}
module.exports = PledgeHandler;
