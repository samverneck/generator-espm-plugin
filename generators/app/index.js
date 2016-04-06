'use strict';

var generators = require( 'yeoman-generator' );
var chalk = require( 'chalk' );
var yosay = require( 'yosay' );
var path = require( 'path' );
var _ = require( 'underscore.string' );

module.exports = generators.Base.extend( {

    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply( this, arguments );

        this.option( 'skip-install' );  // This method adds support for a `--skip-install` flag
    },

    initializing: function() {
        this.pkg = require( '../../package.json' );

        this.argument( 'pluginName', { type: String, required: false } );
        this.pluginName = this.pluginName || path.basename( process.cwd() );
        this.pluginName = _.camelize( _.slugify( _.humanize( this.pluginName ) ) );
    },

    prompting: function() {
        var done = this.async();
        var prompts;

        // Have Yeoman greet the user.
        this.log( yosay( 'Bem-vindo ao gerador de ' + chalk.red( 'plugins do ES na palma da mão!' ) ) );

        prompts = [ {
            type: 'input',
            name: 'githubUserName',
            message: 'Por favor digite seu username do Github:',
            store: true
        } ];

        this.prompt( prompts, function( answers ) {
            this.githubUserName = answers.githubUserName;

            done();
        }.bind( this ) );
    },

    writing: {

        git: function() {
            this.fs.copy(
              this.templatePath( 'gitignore' ),
              this.destinationPath( '.gitignore' )
            );
        },

        eslint: function() {
            this.fs.copy(
              this.templatePath( 'eslintrc.json' ),
              this.destinationPath( '.eslintrc.json' )
            );
        },

        systemjs: function() {
            this.fs.copy(
              this.templatePath( 'config.js' ),
              this.destinationPath( 'config.js' )
            );
        },

        directories: function() {
            this.fs.copy(
              this.templatePath( 'lib' ),
              this.destinationPath( 'lib' )
            );

            this.fs.copy(
              this.templatePath( 'test' ),
              this.destinationPath( 'test' )
            );
        },

        gulp: function() {
            this.fs.copyTpl(
              this.templatePath( 'gulpfile.js' ),
              this.destinationPath( 'gulpfile.js' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName
                }
            );
        },

        readme: function() {
            this.fs.copyTpl(
              this.templatePath( 'README.md' ),
              this.destinationPath( 'README.md' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName
                }
            );
        },

        packageJson: function() {
            this.fs.copyTpl(
              this.templatePath( 'package.json' ),
              this.destinationPath( 'package.json' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName
                }
            );
        }
    },

    install: function() {
        if ( !this.options[ 'skip-install' ] ) {
            this.npmInstall();
        }
    },

    end: function() {
        if ( !this.options[ 'skip-install' ] ) {
            this.spawnCommand( 'jspm', [ 'install', '-y' ] );
        }
    }
} );
