'use strict';

var path = process.cwd();
var PledgeHandler = require(path + '/app/handlers/pledgeHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/search')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/search.html');
		});
		
	app.route('/mypledges')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/mypledges.html');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');	
		});
		
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user);
		});

	app.route('/auth/google')
		.get(passport.authenticate('google', { scope: [ 'profile' ] } ));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
			successRedirect: '/',
			failureRedirect: '/login'
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
	
	app.route('/api/all/pledges')
		.get(pledgeHandler.getAllPledges);
		
	app.route('/api/pledge/:id')
		.get(pledgeHandler.getPledge);
		
	app.route('/api/my/pledges')
		.get(pledgeHandler.getMyPledges);
		
	app.route('/api/my/pledge/:id')
		.post(pledgeHandler.addMeToPledge)
		.delete(pledgeHandler.removeMeFromPledge);
};
