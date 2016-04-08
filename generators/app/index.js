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
        this.log( yosay( 'Bem-vindo ao gerador de ' + chalk.blue( 'plugins do ES na palma da mão!' ) ) );

        prompts = [ {
            type: 'input',
            name: 'githubUserName',
            message: 'Por favor digite seu username do Github:',
            store: true
        },
        {
            type: 'input',
            name: 'autoExec',
            message: 'Deseja executar o plugin imediatamente após a instalação? (Yn)'
        },
        {
            type: 'list',
            name: 'format',
            message: 'Qual o "module system" usado pelo plugin?',
            choices: [ {
                name: 'ES6',
                value: 'es6'
            }, {
                name: 'CommonJS',
                value: 'cjs'
            } ],
            default: 0
        } ];

        this.prompt( prompts, function( answers ) {
            this.githubUserName = answers.githubUserName;
            this.autoExec = !answers.autoExec || ( answers.autoExec === 'Y' || answers.autoExec === 'y' );
            this.format = answers.format;
            done();
        }.bind( this ) );
    },

    writing: {

        espmEmulator: function() {
            var context = {
                pluginName: this.pluginName,
                capitalPluginName: _.capitalize( this.pluginName )
            };

            this.fs.copy(
                  this.templatePath( 'lib/espmEmulator/css' ),
                  this.destinationPath( 'lib/espmEmulator/css' ) );

            this.fs.copy(
                  this.templatePath( 'lib/espmEmulator/img' ),
                  this.destinationPath( 'lib/espmEmulator/img' ) );

            this.fs.copy(
                  this.templatePath( 'lib/espmEmulator/espm.js' ),
                  this.destinationPath( 'lib/espmEmulator/espm.js' ) );

            this.fs.copyTpl(
                  this.templatePath( 'lib/espmEmulator/espm.routes.js' ),
                  this.destinationPath( 'lib/espmEmulator/espm.routes.js' ),
                  context );

            this.fs.copy(
                  this.templatePath( 'lib/espmEmulator/espm.controller.js' ),
                  this.destinationPath( 'lib/espmEmulator/espm.controller.js' ) );

            this.fs.copyTpl(
                 this.templatePath( 'lib/espmEmulator/_index.html' ),
                 this.destinationPath( 'lib/espmEmulator/index.html' ),
                 context );
        },



        pluginSrc: function() {

            var context = {
                pluginName: this.pluginName,
                capitalPluginName: _.capitalize( this.pluginName ),
                format: this.format
            };

            // resolve o caminho para o path do formato escollhido para o plugin
            var _resolve = function( file ) {
                return 'lib/plugin/' + this.format + '/' + file;
            }.bind( this );

            this.fs.copyTpl(
                this.templatePath( _resolve( '_index.js' ) ),
                this.destinationPath( 'lib/plugin/index.js' ),
                context );

            this.fs.copyTpl(
                this.templatePath( _resolve( '_plugin.controller.js' ) ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.controller.js' ),
                context );

            this.fs.copyTpl(
                this.templatePath( _resolve( '_plugin.controller.specs.js' ) ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.controller.specs.js' ),
                context );

            this.fs.copyTpl(
                this.templatePath( _resolve( '_plugin.routes.js' ) ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.routes.js' ),
                context );

            this.fs.copyTpl(
                this.templatePath( 'lib/plugin/plugin.tpl.html' ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.tpl.html' ),
                context );

            this.fs.copy(
                this.templatePath( 'lib/plugin/plugin.css' ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.css' ) );
        },

        git: function() {
            this.fs.copy(
                this.templatePath( 'gitignore' ),
                this.destinationPath( '.gitignore' ) );
        },

        eslint: function() {
            this.fs.copy(
                this.templatePath( 'eslintrc.json' ),
                this.destinationPath( '.eslintrc.json' ) );
        },

        systemjs: function() {
            this.fs.copy(
                this.templatePath( 'config.js' ),
                this.destinationPath( 'config.js' ) );


            this.fs.copy(
              this.templatePath( 'system.yuml.js' ),
              this.destinationPath( 'system.yuml.js' ) );
        },

        tests: function() {
            this.fs.copy(
                this.templatePath( 'test' ),
                this.destinationPath( 'test' ) );
        },

        gulp: function() {
            this.fs.copyTpl(
                this.templatePath( 'gulpfile.js' ),
                this.destinationPath( 'gulpfile.js' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName
                } );
        },

        readme: function() {
            this.fs.copyTpl(
                this.templatePath( 'README.md' ),
                this.destinationPath( 'README.md' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName
                } );
        },

        packageJson: function() {
            this.fs.copyTpl(
                this.templatePath( 'package.json' ),
                this.destinationPath( 'package.json' ),
                {
                    repo: this.pluginName,
                    user: this.githubUserName,
                    format: this.format
                } );
        }
    },

    install: function() {
        if ( this.options[ 'skip-install' ] ) {
            return;
        }

        this.npmInstall();
    },

    end: function() {
        var install;

        if ( this.options[ 'skip-install' ] ) {
            return;
        }

        install = this.spawnCommand( 'jspm', [ 'install', '-y' ] );

        install.on( 'close', function( code ) {
            if ( code === 0 ) {
                this.log( 'jspm install terminou com sucesso!' );

                if ( this.autoExec ) {
                    this.spawnCommand( 'npm', [ 'run', 'serve' ] );
                }
            }
        }.bind( this ) );
    }
} );
