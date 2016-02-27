var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var mongodbData = require('gulp-mongodb-data');
require('dotenv').load();

var path = {
  JS: ['app/components/*.js*'],
  CONCAT_FILE: 'build.js',
  DEST: 'public/scripts'
};

gulp.task('seed', function() {
  gulp.src('app/seed/pledges.json')
    .pipe(mongodbData({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'pledges',
      dropCollection: true
    }));
});

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
