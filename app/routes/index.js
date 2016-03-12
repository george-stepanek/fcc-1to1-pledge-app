'use strict';

var request = require("request");
var path = process.cwd();
var PledgeHandler = require(path + '/app/handlers/pledgeHandler.server.js');

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/pledge/:title')
		.get(function (req, res) {
			var baseUrl = req.protocol + "://" + req.get("host");
			request(baseUrl + '/api/pledge/' + req.params.title, function (error, response, body) {
			  var js = JSON.parse(body);
				res.render(path + '/public/index.ejs', {
					"url": baseUrl + req.originalUrl,
					"title": js.title,
					"description": "I have so pledged: '" + js.explanation + "'",
					"image": baseUrl + js.thumbnailUrl
				})
			})
		});

	app.route('/search')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/mypledges/:id')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/category/:category')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/:id')
		.get(function (req, res) {
			res.json(req.user);
		});

	app.route('/auth/google')
		.get(passport.authenticate('google', { scope: [ 'profile' ] } ));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	var pledgeHandler = new PledgeHandler();

	app.route('/api/search/pledges')
		.get(pledgeHandler.searchPledges);

	app.route('/api/pledge/:title')
		.get(pledgeHandler.getPledge);

	app.route('/api/my/pledges/:id')
		.get(pledgeHandler.getMyPledges);

	app.route('/api/my/pledge/:title')
		.post(pledgeHandler.addMeToPledge)
		.delete(pledgeHandler.removeMeFromPledge);

	app.route('/api/all/categories')
		.get(pledgeHandler.getCategories);

	app.route('/api/category/pledges/:category')
		.get(pledgeHandler.getPledgesForCategory);

	app.route('/api/user/:id')
		.get(pledgeHandler.getUser);
};
