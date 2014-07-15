var gulp = require('gulp');
var jshint = require('gulp-jshint');

var tmodjs = require('./index.js');

gulp.task('jshint', function(){
	return gulp.src(['./gulpfile.js', './index.js'])
			.pipe(jshint());
});

gulp.task('default', function(){

	return gulp.src('./test/tpl/**/*.html')
			.pipe(tmodjs({
				base: './test/tpl',
				combo: true,
				output: './test/dist'
			}));

});