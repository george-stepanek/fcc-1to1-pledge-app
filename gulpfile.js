var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');

var path = {
  JS: ['app/components/*.js*'],
  CONCAT_FILE: 'build.js',
  DEST: 'public/scripts'
};

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

// to refresh the database:
// mongo clementinejs --eval "db.pledges.remove({})"
// mongoimport --jsonArray --db clementinejs --collection pledges --file app/seed/pledges.json
