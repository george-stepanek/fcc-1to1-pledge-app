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
		// TODO
	};
	
	this.getMyPledges = function (req, res) {
		// TODO
	};
	
	this.addMeToPledge = function (req, res) {
		// TODO
	};
	
	this.removeMeFromPledge = function (req, res) {
		// TODO
	};
}
module.exports = PledgeHandler;