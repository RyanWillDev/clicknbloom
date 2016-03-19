'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');

// Compiles Sass

gulp.task('compileSass', function() {
  gulp.src('assets/sass/main.scss')
  .pipe(sass({ includePaths: require('node-neat').includePaths })) // Includes both Bourbon and Neat
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('assets/'));
});

gulp.task('watchSass', function() {
  gulp.watch('assets/sass/**/*.scss', ['compileSass']);
});
