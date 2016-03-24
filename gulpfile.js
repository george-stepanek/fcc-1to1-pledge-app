var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
require('dotenv').load();

var path = {
  JS: ['app/components/*.js*'],
  CONCAT_FILE: 'build.js',
  DEST: 'public/scripts'
};
var seed = './app/seed/pledges.json';

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.CONCAT_FILE))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function(){
  gulp.watch(path.JS, ['transform']);
});

gulp.task('default', ['watch']);

gulp.task('seed', function() {
  var mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI);
  var Pledge = require('./app/models/pledges.js');
  
  var counter = 0, pledgesData = require(seed);
  pledgesData.forEach(function(pledgeData) {
		Pledge.findOne({ 'title': pledgeData.title }, function (err, pledge) {
    if (err) { throw err; }
			if (!pledge) {
			  pledge = new Pledge();
			  pledge.title = pledgeData.title;
			}

      pledge.category = pledgeData.category;
      pledge.explanation = pledgeData.explanation;
      pledge.impactPerWeek = pledgeData.impactPerWeek;
      pledge.impactUnits = pledgeData.impactUnits;
      pledge.source = pledgeData.source;
      pledge.citation = pledgeData.citation;
      pledge.imageUrl = pledgeData.imageUrl;
      pledge.thumbnailUrl = pledgeData.thumbnailUrl;

			pledge.save(function (err) {
        if(++counter == pledgesData.length) {
          mongoose.connection.close();			    
        }
				if (err) { throw err; }
			});
		});
  });
});
