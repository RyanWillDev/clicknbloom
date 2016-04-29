'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');

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

// Minify CSS
gulp.task('compressCSS', function() {
  return gulp.src('assets/main.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/assets/'));
});

gulp.task('compressJS', function() {
  return gulp.src('assets/js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'));
});

// Compress Assets
gulp.task('compress', ['compressCSS', 'compressJS']);
