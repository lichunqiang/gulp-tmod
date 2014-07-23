var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

var tmodjs = require('./index.js');

gulp.task('jshint', function(){
	return gulp.src(['./gulpfile.js', './index.js'])
			.pipe(jshint());
});

gulp.task('watch', function(){
	return gulp.src('./test/tpl/**/*.html')
			.pipe(watch(function(files){
				files.pipe(tmodjs({
					base: './test/tpl',
					combo: true,
					output: './test/dist'
				}));
			}));
});

gulp.task('test-stream', function(){
	return gulp.src('./test/tpl/**/*.html', {buffer: false})
			.pipe(tmodjs({
				base: './test/tpl',
				combo: true,
				output: './test/dist'
			}));
});

gulp.task('default', function(){
	return gulp.src('./test/tpl/**/*.html')
			.pipe(tmodjs({
				base: './test/tpl',
				combo: true,
				output: './test/dist'
			})).
			pipe(gulp.dest('./dest'));
});