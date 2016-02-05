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

function compareOuput (filepath, data) {
  filepath = path.join(__dirname, filepath);
  if (fs.statSync(filepath)) {
    var file = fs.readFileSync(filepath);
    var expected = file.toString();
    var actual = data.contents.toString();
    return actual.should.be.equal(expected);
  } else {
    throw new Error('filepath not exist');
  }
}

describe('gulp-tmod', function() {

  describe('tmod()', function() {

    after(function(done){
      del.sync(path.join(__dirname, '../.tmp/**'));
      done();
    });

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
        .pipe(tmod({combo: false, output: '.tmp'}))
        .pipe(assert.length(3))
        .pipe(assert.first(function (d) {
          compareOuput('../.tmp/test/fixtures/bar.js', d);
        }))
        .pipe(assert.second(function (d) {
          compareOuput('../.tmp/test/fixtures/foo.js', d);
        }))
        .pipe(assert.last(function (d) {
          compareOuput('../.tmp/template.js', d);
        }))
        .pipe(assert.end(done));
    })

    it('should combo file', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: true, output: '.tmp'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) {
          compareOuput('../.tmp/template.js', d);
        }))
        .pipe(assert.end(done));
    })

    it('should escape', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({escape: true, output: '.tmp'}))
        .pipe(assert.first(function (d) {
          compareOuput('../.tmp/template.js', d);
        }))
        .pipe(assert.end(done))
    })

    it('should not escape', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({escape: false, output: '.tmp'}))
        .pipe(assert.first(function (d) {
          compareOuput('../.tmp/template.js', d);
        }))
        .pipe(assert.end(done))
    })

    it('should use runtime option', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: true, runtime: 'combo.js'}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) {
          path.basename(d.path).should.eql('combo.js');
        }))
        .pipe(assert.end(done));
    })

    it('should use templateBase option', function(done) {
      gulp.src(fixtures('*'))
        .pipe(tmod({combo: false, templateBase: 'test/', output: '.tmp'}))
        .pipe(assert.first(function (d) {
          compareOuput('../.tmp/fixtures/bar.js', d);
        }))
        .pipe(assert.second(function (d) {
          compareOuput('../.tmp/fixtures/foo.js', d);
        }))
        .pipe(assert.end(done));
    })
  });

});
