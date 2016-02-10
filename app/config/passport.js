'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findOne({ 'id': id }, { '_id': false }, function (err, user) {
			done(err, user);
		});
	});

	var authenticate = function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.id = profile.id;
					newUser.username = profile.username;
					newUser.displayName = profile.displayName;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	};
	
	passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_KEY,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: process.env.APP_URL + 'auth/github/callback'
	}, authenticate));
};
