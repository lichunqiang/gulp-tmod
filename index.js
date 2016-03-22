'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var TmodJS = require('tmodjs');
var extend = require("xtend");
var PluginError = gutil.PluginError;
var File = gutil.File;

var PLUGIN_NAME = 'gulp-tmod';

module.exports = function(opt) {
  var templatePaths = [];

  var defaults = {
    type: 'default',
    combo: true,
    watch: false,
    minify: false,
    output: false,
    verbose: false,
    runtime: 'template.js',
    templateBase: process.cwd()
  };

  var config = extend({}, defaults, opt);
  config.runtime = path.basename(config.runtime);

  if(config.type !== 'default') config.combo = false;
  if(config.output !== false) config.output = path.join(process.cwd(), config.output);


  var tmodjs = new TmodJS(config.templateBase, config);
  var transformFiles = [];
  var hasOnCompile = false;
  var compileCount = 0;

  function transform(file, enc, cb) {
    if (file.isNull()) {
      cb();
      return;
    }

    var templatePath = path.normalize(path.relative(config.templateBase, file.path));

    if(!config.combo) {
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
    if (config.combo && templatePaths.length) {
      tmodjs.on('combo', function (error, data) {
        if (error) {
          cb(new gutil.PluginError(PLUGIN_NAME, error));
          return;
        }

        var file = new File({
          path: config.runtime,
          contents: new Buffer(data.output)
        });

        this.push(file);
        cb();
      }.bind(this));
      tmodjs.compile(templatePaths);
      return;
    }

    if (!config.combo && compileCount) {
      tmodjs._buildRuntime(null, null, function(error, data) {
        if (error) {
          cb(new gutil.PluginError(PLUGIN_NAME, error));
          return;
        }

        var file = new File({
          path: config.runtime,
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
