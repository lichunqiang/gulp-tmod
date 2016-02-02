require('mocha');

var fs = require('fs');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var File = require('gulp-util').File;
var tmod = require('../');
var should = require('should');
var assert = require('stream-assert');

function fixtures (glob) { return path.join(__dirname, 'fixtures', glob); }

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
        .pipe(assert.length(2))
        .pipe(assert.first(function (d) {
          var c = d.contents.toString();
          c.should.containEql('test/fixtures/bar');
        }))
        .pipe(assert.second(function (d) {
          var c = d.contents.toString();
          c.should.containEql('test/fixtures/foo');
        }))
        .pipe(assert.end(done));
    })

    it('should combo file', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: true}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) {
          var c = d.contents.toString();
          c.should.containEql('test/fixtures/bar') && c.should.containEql('test/fixtures/foo');
        }))
        .pipe(assert.end(done));
    })

    it('should use comboFilename option', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({
          combo: true,
          comboFilename: 'combo.js'
        }))
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
          var c = d.contents.toString();
          c.should.containEql('fixtures/bar') && c.should.containEql('fixtures/foo');
        }))
        .pipe(assert.end(done));
    })
  });

});
