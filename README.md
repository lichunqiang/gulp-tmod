gulp-tmod
-------------

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-dm-image]][david-dm-url]

[npm-url]:         https://badge.fury.io/js/gulp-tmod
[npm-image]:       https://badge.fury.io/js/gulp-tmod.png
[travis-url]:      https://travis-ci.org/lichunqiang/gulp-tmod
[travis-image]:    https://travis-ci.org/lichunqiang/gulp-tmod.png?branch=master
[david-dm-url]:    https://david-dm.org/lichunqiang/gulp-tmod
[david-dm-image]:  https://david-dm.org/lichunqiang/gulp-tmod.png?theme=shields.io

> [tmodjs](https://github.com/aui/tmodjs)'s gulp version.

## Install

```sh
$ npm install gulp-tmod --save-dev
```

## Usage

```javascript
var tmodjs = require('gulp-tmod');

gulp.task('default', function(){

	return gulp.src('./test/tpl/**/*.html')
			.pipe(tmodjs({
				base: './test/tpl',
				combo: true,
				output: './test/dist'
			}));

});
```

## Watch

```javascript
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
```
More see [gulp-watch](https://github.com/floatdrop/gulp-watch)

## Test

```sh
$ npm test
```

## More

See [__tmodjs__](https://github.com/aui/tmodjs)

[grunt-tmod](https://github.com/Jsonzhang/grunt-tmod)

_Issues should be reported on the tmodjs [issue tracker](https://github.com/aui/tmodjs/issues)_