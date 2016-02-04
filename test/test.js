require('mocha');

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var File = require('gulp-util').File;
var tmod = require('../');
var should = require('should');
var assert = require('stream-assert');

function fixtures (glob) { return path.join(__dirname, 'fixtures', glob); }
function contains (data, str) { return data.contents.toString().should.containEql(str); }

describe('gulp-tmod', function() {

  describe('tmod()', function() {
    it('should ignore null files when combo is false', function(done) {
      var stream = tmod({combo: false});
      stream
        .pipe(assert.length(0))
        .pipe(assert.end(done));
      stream.write(new File());
      stream.end();
    })

    it('should ignore null files when combo is true', function(done) {
      var stream = tmod({combo: true});
      stream
        .pipe(assert.length(0))
        .pipe(assert.end(done));
      stream.write(new File());
      stream.end();
    })

    it('should not combo file', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: false}))
        .pipe(assert.length(3))
        .pipe(assert.first(function (d) {
          contains(d, 'test/fixtures/bar');
        }))
        .pipe(assert.second(function (d) {
          contains(d, 'test/fixtures/foo');
        }))
        .pipe(assert.last(function (d) {
          contains(d, 'function template');
        }))
        .pipe(assert.end(done));
    })

    it('should combo file', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: true}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) {
          contains(d, 'test/fixtures/bar') && contains(d, 'test/fixtures/foo');
        }))
        .pipe(assert.end(done));
    })

    it('should escape', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({escape: true}))
        .pipe(assert.first(function (d) {
          contains(d, '$escape(bar)') && contains(d, '$escape(foo)');
        }))
        .pipe(assert.end(done))
    })

    it('should not escape', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({escape: false}))
        .pipe(assert.first(function (d) {
          contains(d, '$string(bar)') && contains(d, '$string(foo)');
        }))
        .pipe(assert.end(done))
    })

    it('should use runtime option', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: true,runtime: 'combo.js'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) {
          path.basename(d.path).should.eql('combo.js');
        }))
        .pipe(assert.end(done));
    })

    it('should use templateBase option', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({templateBase: 'test/'}))
        .pipe(assert.first(function (d) {
          contains(d, 'fixtures/bar') && contains(d, 'fixtures/foo');
        }))
        .pipe(assert.end(done));
    })
  });

});
