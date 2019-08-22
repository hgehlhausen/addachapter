const fs = require('fs');

module.exports = class PackageJsonPlugin {
  constructor(options) {
    const {
      name,
      version,
      description,
      main,
      author,
      keywords,
    } = options;
    this.name = name;
    this.version = version;
    this.description = description;
    this.main = main;
    this.author = author;
    this.keywords = keywords;
  }
  apply(compiler) {
    compiler.hooks.done.tap('PackageJsonPlugin', stats => {
      console.log('hello world', stats, this);
      const {
        outputOptions: {
          path
        } = {}
      } = stats;
    });
  }
}
