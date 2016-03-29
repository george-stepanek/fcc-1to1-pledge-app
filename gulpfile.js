var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var mongoose = require('mongoose');
var Pledge = require('./app/models/pledges.js');
var path = ['app/components/*.js*'];

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

gulp.task('transform', function(){
  gulp.src(path)
    .pipe(react())
    .pipe(concat('build.js'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('watch', function(){
  gulp.watch(path, ['transform']);
});

gulp.task('default', ['transform', 'watch']);

gulp.task('seed', function() {
  // Load and parse the JSON data
  var counter = 0, pledgesData = require('./app/seed/pledges.json');
  pledgesData.forEach(function(pledgeData) {
		Pledge.findOne({ 'title': pledgeData.title }, function (err, pledge) {
    if (err) { throw err; }
			if (!pledge) {
			  pledge = new Pledge();
			  pledge.title = pledgeData.title;
			}

      pledge.no = pledgeData.no;
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

gulp.task('postinstall', ['transform', 'seed']);

gulp.task('reload', function() {
  gulp.src('app/seed/pledges.json')
    .pipe(require('gulp-mongodb-data')({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'pledges',
      dropCollection: true
    }));
});
 
