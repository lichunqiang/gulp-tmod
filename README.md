gulp-tmod
-------------

> [tmodjs](https://github.com/aui/tmodjs)'s gulp version.

## Install

```
$ npm install gulp-tmod --save-dev
```

## Usage

```
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

## Test

```
$ npm test
```

## More

See [__tmodjs__](https://github.com/aui/tmodjs)

[grunt-tmod](https://github.com/Jsonzhang/grunt-tmod)

_Issues should be reported on the tmodjs [issue tracker](https://github.com/aui/tmodjs/issues)_