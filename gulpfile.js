const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const path = require('path');
const sasslint = require('gulp-sass-lint');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const header = require('gulp-header');

const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

function getBanner() {
return `/**
* ${pkg.name} - v${pkg.version}
* ${pkg.description}
* Build ${new Date().toISOString()}
*/
`;
} // getBanner

/** VIEW */
gulp.task('views', () =>
  gulp.src('index.pug')
    .pipe(pug({
      pretty: !isProduction,
      data: {
        environment: isProduction ? 'production' : 'development',
      },
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist')),
);

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
      .pipe(header(getBanner()))
      .pipe(gulp.dest('./dist'))
  }

  return cssBundle
    .pipe(cleanCSS())
    .pipe(header(getBanner()))
    .pipe(rename({ basename: 'flexy.min' }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['views','styles']);
