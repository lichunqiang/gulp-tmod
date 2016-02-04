__Notice: Please read this [issue](https://github.com/lichunqiang/gulp-tmod/issues/7)__
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

## Options

Similar to [tmodjs options](https://github.com/aui/tmodjs#配置) with a bit of difference.

#### output 
Default: `false`

We use gulp steam other than tmodjs output, so set it to false prevent tmodjs create files.

#### templateBase
Default: `__dirname`

Your template basepath.

#### minify 
Minify is deprecated, we should use [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

#### cache
Cache is deprecated, we should use [gulp-cached](https://www.npmjs.com/package/gulp-cached)

## Usage

```javascript
var tmodjs = require('gulp-tmod');

gulp.task('default', function(){
	var stream = gulp.src('template/**/*.html')
			.pipe(tmodjs({
				combo: true,
				runtime: 'runtime.js',
				templateBase: 'template'
			}))
			.pipe(gulp.dest('dist'));
	return stream;
});
```


## Test

```sh
$ npm test
```


## Changelog

#### 2.0.0
- Tt's a breaking change since 1.0.0.

## More

See [__tmodjs__](https://github.com/aui/tmodjs)

[grunt-tmod](https://github.com/Jsonzhang/grunt-tmod)

_Issues should be reported on the tmodjs [issue tracker](https://github.com/aui/tmodjs/issues)_
