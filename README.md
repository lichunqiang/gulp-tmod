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

#### combo
Type: `boolean`
Defualt: `true`
If combo is false, it won't procude [arttempalte](https://github.com/aui/artTemplate/), you should download it manually.

#### output
Type: `string`
Default: '.tmp'
Since [tmodjs](https://github.com/aui/tmodjs#配置) will alway output something, but it's useless with gulp stream, place it at temp path and it will be delete by default, unless set `delOutput` option `false`.

#### delOutput
Type: `boolean`
Default: `true`


## Usage

```javascript
var tmodjs = require('gulp-tmod');

gulp.task('default', function(){
	var stream = gulp.src('template/**/*.html')
			.pipe(tmodjs({
				combo: true,
				comboFilename: 'combo.js',
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
