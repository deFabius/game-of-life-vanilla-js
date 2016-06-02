'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	open = require('gulp-open');

gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('refresh:html', function() {
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('refresh:javascript', function() {
	gulp.src(['./script/**/*.js'], {base: 'script/'})
		.pipe(connect.reload());
});

gulp.task('dev:watch', function() {
	gulp.watch(['./*.html', './script/**/*.js'], ['refresh:html', 'refresh:javascript']);
});

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./css'));
});

gulp.task('open', function() {
	gulp.src('./index.html')
		.pipe(open({
			uri: 'http://localhost:8080',
			app: 'google chrome'
		}));
});

gulp.task('sass:watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('dev', ['sass:watch', 'connect', 'dev:watch', 'open']);