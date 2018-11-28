'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const pug = require('gulp-pug');
const sass=require('gulp-sass');


gulp.task('default', ['browser-sync'], function () {
});
gulp.task('sass',()=>{
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/sass/*.sass'])
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    /* .pipe(browserSync.stream()); */
});
gulp.task('pug',()=>{
    return gulp.src('public/views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('public/'))
   /*  .pipe(browserSync.stream()); */
});
gulp.task('js',()=>{
    return gulp.src('public/js/*.js')
    .pipe(gulp.dest('public/js/'))
   /*  .pipe(browserSync.stream()); */
});
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy:  "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/sass/*.sass'], ['sass']);
    gulp.watch('public/views/*.pug',['pug']);
    gulp.watch('public/js/*.js',['js']);
    /*gulp.watch('public/*.html').on('change', browserSync.reload); */
});
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});