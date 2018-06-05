const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const sasslint = require('gulp-sass-lint');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const isProduction = process.env.NODE_ENV === 'production';

/** LINT STYLES */
gulp.task('lint-styles', () =>
  gulp.src('./src/flexy.scss')
    .pipe(sasslint())
    .pipe(sasslint.format()));

/** STYLES */
gulp.task('styles', ['lint-styles'], () => {
  const cssBundle = gulp.src('./src/flexy.scss')
    .pipe(sass().on('error', sass.logError))
  
  if(!isProduction) {
    return cssBundle
      .pipe(gulp.dest('./dist'))
  }

  return cssBundle
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'flexy.min' }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['styles']);