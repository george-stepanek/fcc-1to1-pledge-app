'use strict';

var GoogleStrategy = require('passport-google-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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
	
	var googleAuthenticate = function (req, token, refreshToken, profile, done) {
		return authenticate(token, refreshToken, profile, done);
	};

	var authenticate = function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'id': profile.id }, function (err, user) {
				if (err) { return done(err); }

				if (user) {
					return done(null, user);
				} 
				else {
					var newUser = new User();
					newUser.id = profile.id;
					newUser.displayName = profile.displayName;
					newUser.emailAddress = profile.emails[0].value;

					newUser.save(function (err) {
						if (err) { throw err; }
						return done(null, newUser);
					});
				}
			});
		});
	};
	
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.APP_URL + 'auth/google/callback',
		passReqToCallback: false
	},
	googleAuthenticate));
	
	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_KEY,
		clientSecret: process.env.FACEBOOK_SECRET,
		callbackURL: process.env.APP_URL + 'auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email']
	},
	authenticate));
};
