'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.appname = path.basename(process.cwd());
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Interactive Template Generator (AU)') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 's3Path',
        message: 'Please the s3 path on interactive?',
        store   : true
      }];

    this.prompt(prompts, function (props) {
      this.githubUserName = props.githubUserName;
      this.s3Path = props.s3Path;

      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('jshintrc', '.jshintrc');
      this.directory('src', 'src');

      var context = { 
        repo: this.appname,
        user: this.githubUserName,
        path: this.s3Path
      };

      this.template('bower.json', 'bower.json', context);
      this.template('index.html', 'index.html', context);
      this.template('gulpfile.js', 'gulpfile.js', context);
      this.template('README.md', 'README.md', context);
      this.template('package.json', 'package.json', context);
    },
  },
  end: function () {
    this.spawnCommand('jspm', ['install', '-y']);
    this.spawnCommand('jspm', ['dl-loader','-y', '--babel']);
  }
});
