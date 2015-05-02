/* jshint node: true */
'use strict';

var PostcssCompiler = require('broccoli-postcss');
var CanadianStylesheets = require('postcss-canadian-stylesheets');
var checker = require('ember-cli-version-checker');

function CanadianStylesheetsCompiler(options) {
  this.name = 'ember-cli-canadian-stylesheets';
  this.options = {};
  this.options.inputFile = options.inputFile || 'app.css';
  this.options.outputFile = options.outputFile || 'app.css';
}

CanadianStylesheetsCompiler.prototype.toTree = function(tree, inputPath, outputPath) {
  var trees = [tree];

  if (this.options.includePaths) {
    trees = trees.concat(this.options.includePaths);
  }

  inputPath += '/' + this.options.inputFile;
  outputPath += '/' + this.options.outputFile;

  var plugins = [
    {
      module: CanadianStylesheets,
      options: {}
    }
  ];

  return new PostcssCompiler(trees, inputPath, outputPath, plugins);
}

module.exports = {
  name: 'Ember CLI Canadian Stylesheeets',

  shouldSetupRegistryInIncluded: function shouldSetupRegistryInIncluded() {
    return !checker.isAbove(this, '0.2.0');
  },

  included: function included(app) {
    this.app = app;

    var options = app.options.canadianStylesheetsOptions || {};

    options.outputFile = options.outputFile || this.app.name + '.css';

    app.registry.add('css', new CanadianStylesheetsCompiler(options));

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
