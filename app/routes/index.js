'use strict';

var path = process.cwd();
var defaultImage = "/public/images/think-before-you-plant-thumb.jpg";

var request = require("request");
var PledgeHandler = require(path + '/app/handlers/pledgeHandler.server.js');

module.exports = function (app, passport) {

	app.route(['/', '/search', '/category/:category', '/404'])
		.get(function (req, res) {
			var baseUrl = req.protocol + "://" + req.get("host");
			res.render(path + '/public/index.ejs', {
				"url": baseUrl + req.originalUrl,
				"title": "1to1 Movement Pledges",
				"description": "Pledges to help the planet, and progress so far.",
				"image": baseUrl + defaultImage,
				"width": 600,
				"height": 400
			});
		});

	app.route('/pledge/:title')
		.get(function (req, res) {
			var baseUrl = req.protocol + "://" + req.get("host");
			request(baseUrl + '/api/pledge/' + req.params.title, function (error, response, body) {
				if(body.length) {
					var js = JSON.parse(body);
					res.render(path + '/public/index.ejs', {
						"url": baseUrl + req.originalUrl,
						"title": js.title,
						"description": js.explanation,
						"image": baseUrl + js.thumbnailUrl,
						"width": 600,
						"height": 400
					});
				}
				else {
					res.redirect('/404');
				}
			});
		});

	app.route('/mypledges/:id')
		.get(function (req, res) {
			var baseUrl = req.protocol + "://" + req.get("host");
			request(baseUrl + '/api/user/' + req.params.id, function (error, response, body) {
				var js = JSON.parse(body);
				if(js) {
					res.render(path + '/public/index.ejs', {
						"url": baseUrl + req.originalUrl,
						"title": js.displayName + "'s Pledges",
						"description": js.displayName + "'s pledges to help the planet, and progress so far, via the 1to1 Movement website.",
						"image": baseUrl + defaultImage,
						"width": 600,
						"height": 400
					});
				}
				else {
					res.redirect('/404');
				}
			});
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
		.get(passport.authenticate('google', { scope: [ 'profile', 'email' ] } ));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', { scope: ['email'] }));

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
	
	// If the route doesn't exist just show the main page with a 404 message
	app.get('*', function (req, res) {
		res.redirect('/404');
	});
};
