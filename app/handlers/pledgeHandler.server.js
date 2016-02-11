'use strict';

var Pledges = require('../models/pledges.js');

function PledgeHandler () {
    
	this.getPledges = function (req, res) {
		Pledges.find({ }).exec(function (err, result) { 
		    if (err) { throw err; } 
		    res.json(result);
		});
	};
}
module.exports = PledgeHandler;