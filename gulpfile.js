'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// var bourbon = require('node-bourbon'); // Testing if these lines are required
// var neat = require('node-neat');

// Compiles Sass

gulp.task('compileSass', function() {
  return gulp.src('assets/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('assets/'));
});

// Watches Sass Files runs compileSass task
gulp.task('watchSass', function() {
  gulp.watch('assets/sass/**/*.scss', ['compileSass']);
});
