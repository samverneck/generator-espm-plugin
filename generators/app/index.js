'use strict';
var generators = require( 'yeoman-generator' );
var chalk = require( 'chalk' );
var yosay = require( 'yosay' );
var path = require( 'path' );
var _ = require( 'underscore.string' );
var formats = {
    ES6: 'es6',
    COMMONJS: 'cjs'
};

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

        this._notify( 'Nome do plugin: ' + this.pluginName );
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
                value: formats.ES6
            }, {
                name: 'CommonJS',
                value: formats.COMMONJS
            } ],
            default: 0
        },
        {
            type: 'input',
            name: 'createUnitTests',
            message: 'Deseja criar unit tests? (Yn)'
        } ];

        this.prompt( prompts, function( answers ) {
            this.githubUserName = answers.githubUserName;
            this.autoExec = !answers.autoExec || ( answers.autoExec === 'Y' || answers.autoExec === 'y' );
            this.createUnitTests = !answers.createUnitTests || ( answers.createUnitTests === 'Y' || answers.createUnitTests === 'y' );
            this.format = answers.format;
            done();
        }.bind( this ) );
    },

    // resolve o caminho para o path do formato escolhido para o plugin
    _resolve: function( file ) {
        return 'lib/plugin/' + this.format + '/' + file;
    },

    _context: function() {
        return {
            repo: this.pluginName,
            user: this.githubUserName,
            unitTests: this.createUnitTests,
            pluginName: this.pluginName,
            capitalPluginName: _.capitalize( this.pluginName ),
            format: this.format
        };
    },

    writing: {
        notify: function() {
            this._notify( 'Criando código fonte do plugin: ' + this.pluginName );
        },

        espmEmulator: function() {
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
                  this._context() );

            this.fs.copy(
                  this.templatePath( 'lib/espmEmulator/espm.controller.js' ),
                  this.destinationPath( 'lib/espmEmulator/espm.controller.js' ) );

            this.fs.copyTpl(
                 this.templatePath( 'lib/espmEmulator/_index.html' ),
                 this.destinationPath( 'lib/espmEmulator/index.html' ),
                 this._context() );
        },

        pluginSrc: function() {
            this.fs.copyTpl(
                this.templatePath( this._resolve( '_index.js' ) ),
                this.destinationPath( 'lib/plugin/index.js' ),
                this._context() );

            this.fs.copyTpl(
                this.templatePath( this._resolve( '_plugin.controller.js' ) ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.controller.js' ),
                this._context() );

            this.fs.copyTpl(
                this.templatePath( this._resolve( '_plugin.routes.js' ) ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.routes.js' ),
                this._context() );

            this.fs.copyTpl(
                this.templatePath( 'lib/plugin/plugin.tpl.html' ),
                this.destinationPath( 'lib/plugin/' + this.pluginName + '.tpl.html' ),
                this._context() );

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
            if ( this.createUnitTests ) {
                this.fs.copyTpl(
                    this.templatePath( this._resolve( '_plugin.controller.specs.js' ) ),
                    this.destinationPath( 'lib/plugin/' + this.pluginName + '.controller.specs.js' ),
                    this._context() );

                this.fs.copy(
                    this.templatePath( 'karma.conf.js' ),
                    this.destinationPath( 'karma.conf.js' ) );
            }
        },

        gulp: function() {
            this.fs.copyTpl(
                this.templatePath( 'gulpfile.js' ),
                this.destinationPath( 'gulpfile.js' ),
                this._context() );
        },

        readme: function() {
            this.fs.copyTpl(
                this.templatePath( 'README.md' ),
                this.destinationPath( 'README.md' ),
                this._context() );
        },

        packageJson: function() {
            this.fs.copyTpl(
                this.templatePath( '_package.json' ),
                this.destinationPath( 'package.json' ),
                this._context() );
        }
    },

    install: function() {
        if ( this.options[ 'skip-install' ] ) {
            return;
        }

        this._notify( 'executando npm install:' );

        this.npmInstall();
    },

    end: function() {
        var install;

        if ( this.options[ 'skip-install' ] ) {
            return;
        }

        this._notify( 'executando jspm install:' );

        install = this.spawnCommand( 'jspm', [ 'install', '-y' ] );

        install.on( 'close', function( code ) {
            if ( code === 0 ) {
                this._notify( 'jspm install terminou com sucesso!' );

                if ( this.autoExec ) {

                    this._notify( 'executando plugin:' );

                    this.spawnCommand( 'npm', [ 'start' ] );
                }
            }
        }.bind( this ) );
    },

    _notify: function( msg ) {
        this.log( chalk.yellow( msg ) );
    }
} );
