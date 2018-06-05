var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var sasslint = require('gulp-sass-lint');

gulp.task('lint-styles', () =>
  gulp.src('./src/flexy.scss')
    .pipe(sasslint())
    .pipe(sasslint.format()));

gulp.task('styles', ['lint-styles'], () => 
  gulp.src('./src/flexy.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist')));


gulp.task('default', ['styles']);