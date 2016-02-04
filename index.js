'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var TmodJS = require('tmodjs');
var PluginError = gutil.PluginError;
var File = gutil.File;

var PLUGIN_NAME = 'gulp-tmod';

module.exports = function(opt) {
  var templatePaths = [];

  opt = opt || {};
  opt.cache = false;
  opt.watch = false;
  opt.verbose = opt.verbose || false;
  opt.combo = opt.combo === false ? false : true;

  if (typeof opt.templateBase === 'string') {
    opt.templateBase = opt.templateBase;
  } else {
    opt.templateBase = __dirname;
  }

  if (typeof opt.output === 'string') {
    opt.output = path.join(__dirname, opt.output);
  } else {
    opt.output = false;
  }

  if (typeof opt.runtime === 'string') {
    opt.runtime = path.basename(opt.runtime);
  } else {
    opt.runtime = 'template.js';
  }


  var tmodjs = new TmodJS(opt.templateBase, opt);
  var transformFiles = [];
  var hasOnCompile = false;
  var compileCount = 0;

  function transform(file, enc, cb) {
    if (file.isNull()) {
      cb();
      return;
    }

    var templatePath = path.normalize(path.relative(opt.templateBase, file.path));

    if(!opt.combo) {
      if (!hasOnCompile) {
        hasOnCompile = true;
        tmodjs.on('compile', function(error, data) {
          if (error) {
            cb(new gutil.PluginError(PLUGIN_NAME, error));
            return;
          }

          var cfile = transformFiles[compileCount];
          cfile.contents = new Buffer(data.output);
          cfile.path = gutil.replaceExtension(transformFiles[compileCount++].path, '.js');

          this.push(cfile);
          cb();
        }.bind(this));
      }
      transformFiles.push(file);
      tmodjs.compile(templatePath);
    } else {
      templatePaths.push(templatePath);
      cb();
    }
  }

  function flush(cb) {
    if (opt.combo && templatePaths.length) {
      tmodjs.on('combo', function (error, data) {
        if (error) {
          cb(new gutil.PluginError(PLUGIN_NAME, error));
          return;
        }

        var file = new File({
          path: opt.runtime,
          contents: new Buffer(data.output)
        });

        this.push(file);
        cb();
      }.bind(this));
      tmodjs.compile(templatePaths);
      return;
    }

    if (!opt.combo && compileCount) {
      tmodjs._buildRuntime(null, null, function(error, data) {
        if (error) {
          cb(new gutil.PluginError(PLUGIN_NAME, error));
          return;
        }

        var file = new File({
          path: opt.runtime,
          contents: new Buffer(data)
        });

        this.push(file);
        cb();
        return;
      }.bind(this))
    }

    cb();
  }

  return through.obj(transform, flush);
}
