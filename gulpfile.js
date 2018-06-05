var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');

gulp.task('style', function () {
  return gulp.src('./src/flexy.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
});