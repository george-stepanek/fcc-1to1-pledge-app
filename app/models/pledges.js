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
	smallImageUrl: String,
	user: {
	    id: String,
	    when: Date
	}
});

module.exports = mongoose.model('Pledge', Pledge);

/*
REFUSE THE BAG
Say no to plastic bags when eating out. Plastic can take 1,000 years to degrade in a landfill. Bring your own bag!
8
plastic bags
Reuse This Bag!
http://www.reusethisbag.com/25-reasons-to-go-reusable.php
https://upload.wikimedia.org/wikipedia/commons/8/8f/Hemdchentuete.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hemdchentuete.jpg/320px-Hemdchentuete.jpg
*/
