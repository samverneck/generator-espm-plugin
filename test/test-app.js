'use strict';
import path from 'path';
import yo from 'yeoman-test';
import assert from 'yeoman-assert';
import sinon from 'sinon';

describe( 'generator-espm-plugin', () => {
    let appPath = path.join( __dirname, '../generators/app' );
    let context = {
        appName: 'meuPlugin',
        githubUserName: 'hoisel'
    };

    describe( 'when skip-install === false and autoExec === true', () => {

        let generator;

        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'es6' } )
              .withOptions( {
                  'skip-install': false
              } )
              .on( 'ready', gen => {
                  generator = gen;
                  generator.npmInstall = sinon.spy();
                  sinon.stub( generator, 'spawnCommand', () => {
                      return {
                          on: function( evt, fn ) {
                              fn( 0 );
                          }
                      };
                  } );
              } )
              .on( 'end', done );
        } );

        it( 'then call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'then call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'then call spawnCommand once to serve plugin', () => {
            assert( generator.spawnCommand.calledWith( 'npm', [ 'start' ] ) );
        } );
    } );

    describe( 'when skip-install === false and autoExec === false', () => {

        let generator;

        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( {
                  format: 'es6',
                  autoExec: 'n'
              } )
              .withOptions( {
                  'skip-install': false
              } )
              .on( 'ready', gen => {
                  generator = gen;
                  generator.npmInstall = sinon.spy();
                  sinon.stub( generator, 'spawnCommand', () => {
                      return {
                          on: function( evt, fn ) {
                              fn( 0 );
                          }
                      };
                  } );
              } )
              .on( 'end', done );
        } );

        it( 'then call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'then call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledOnce );
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'then not call spawnCommand once to serve plugin', () => {
            assert( generator.spawnCommand.calledWith( 'npm', [ 'run', 'serve' ] ) === false );
        } );
    } );

    describe( 'when skip-install == false and jspm install fails', () => {

        let generator;

        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'es6' } )
              .withOptions( {
                  'skip-install': false
              } )
              .on( 'ready', gen => {
                  generator = gen;
                  generator.npmInstall = sinon.spy();
                  sinon.stub( generator, 'spawnCommand', () => {
                      return {
                          on: function( evt, fn ) {
                              fn( 1 );
                          }
                      };
                  } );
              } )
              .on( 'end', done );
        } );

        it( 'then call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'then call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledOnce );
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'then not call spawnCommand to serve plugin', () => {
            assert( generator.spawnCommand.calledWith( 'npm', [ 'run', 'serve' ] ) === false );
        } );
    } );

    describe( 'when skip-install == true', () => {

        let generator;

        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'es6' } )
              .withOptions( {
                  'skip-install': true
              } )
              .on( 'ready', gen => {
                  generator = gen;
                  generator.npmInstall = sinon.spy();
                  sinon.stub( generator, 'spawnCommand', () => {
                      return {
                          on: function( evt, fn ) {
                              fn( 0 );
                          }
                      };
                  } );
              } )
              .on( 'end', done );
        } );

        it( 'then never call npmInstall', () => {
            assert( generator.npmInstall.called === false );
        } );

        it( 'then never call spawnCommand', () => {
            assert( generator.spawnCommand.called === false );
        } );
    } );

    describe( 'when createUnitTests === false', () => {
        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( {
                  format: 'cjs',
                  createUnitTests: 'n'
              } )
              .withOptions( {
                  'skip-install': true
              } )
              .on( 'end', done );
        } );

        it( 'then no generates test files', () => {
            assert.noFile( [
                'karma.conf.js', `lib/plugin/${context.appName}.controller.specs.js`
            ] );
        } );
    } );

    //==============================================================================================================================
    // ES6
    // ==============================================================================================================================
    describe( 'when format === es6', () => {
        describe( 'and default settings', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withPrompts( { format: 'es6' } )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .on( 'end', done );
            } );

            it( 'then generates config files', () => {
                assert.file( [
                    'package.json',
                    'README.md',
                    'gulpfile.js',
                    'config.js',
                    'karma.conf.js',
                    '.eslintrc.json',
                    '.gitignore',
                    'system.yuml.js'
                ] );
            } );

            it( 'then plugin depends on eslint-config-prodest', () => {
                assert.fileContent( 'package.json', '"eslint-config-idiomatic":' );
                assert.fileContent( 'package.json', '"eslint-config-prodest":' );
            } );

            it( 'then plugin depends on eslint-config-prodest-angular', () => {
                assert.fileContent( 'package.json', '"eslint-plugin-angular":' );
                assert.fileContent( 'package.json', '"eslint-config-prodest-angular":' );
            } );
        } );

        describe( 'and using --pluginName argument', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withPrompts( { format: 'es6' } )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .withArguments( [ context.appName ] )
                  .on( 'end', done );
            } );

            it( 'then generates the same pluginName in every file', () => {
                assert.fileContent( 'package.json', '"name": "meuPlugin"' );
                assert.fileContent( 'README.md', 'meuPlugin' );
                assert.fileContent( 'gulpfile.js', 'meuPlugin' );
            } );

            it( 'then generates plugin src files with plugin name', () => {
                assert.file( [
                    'lib/plugin/index.js',
                    `lib/plugin/${context.appName}.controller.js`,
                    `lib/plugin/${context.appName}.controller.specs.js`,
                    `lib/plugin/${context.appName}.routes.js`,
                    `lib/plugin/${context.appName}.tpl.html`,
                    `lib/plugin/${context.appName}.css`
                ] );
            } );

            it( 'then generates  espm (ES na palma da mão) emulator files', () => {

                // js
                assert.file( [
                    'lib/espmEmulator/espm.js',
                    'lib/espmEmulator/espm.controller.js',
                    'lib/espmEmulator/espm.routes.js',
                    'lib/espmEmulator/index.html'
                ] );

                //css
                assert.file( [
                    'lib/espmEmulator/css/espm-bootstrap-override.css',
                    'lib/espmEmulator/css/espm.css'
                ] );

                //img
                assert.file( [
                    'lib/espmEmulator/img/user.png',
                    'lib/espmEmulator/img/diamond-effect.png',
                    'lib/espmEmulator/img/brasao-governo-horizontal.png'
                ] );
            } );
        } );

        describe( 'and prompting github user name', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .withPrompts( {
                      githubUserName: context.githubUserName,
                      format: 'es6'
                  } )
                  .withArguments( [ context.appName ] )
                  .on( 'end', done );
            } );

            it( 'then generates the same github username in every file', () => {
                assert.fileContent( 'package.json', '"format": "es6"' );
                assert.fileContent( 'package.json', `"repository": "http://github.com/${context.githubUserName}/${context.appName}"` );
                assert.fileContent( 'gulpfile.js', `jspm link github:${context.githubUserName}/${context.appName}@dev -y` );
            } );
        } );
    } );

    //==============================================================================================================================
    // CommonJS
    // ==============================================================================================================================
    describe( 'when format === cjs', () => {

        describe( 'and default settings', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withPrompts( { format: 'cjs' } )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .on( 'end', done );
            } );

            it( 'then generates config files', () => {
                assert.file( [
                    'package.json',
                    'README.md',
                    'gulpfile.js',
                    'config.js',
                    'karma.conf.js',
                    '.eslintrc.json',
                    '.gitignore',
                    'system.yuml.js'
                ] );
            } );

            it( 'then plugin depends on eslint-config-prodest', () => {
                assert.fileContent( 'package.json', '"eslint-config-idiomatic":' );
                assert.fileContent( 'package.json', '"eslint-config-prodest":' );
            } );

            it( 'then plugin depends on eslint-config-prodest-angular', () => {
                assert.fileContent( 'package.json', '"eslint-plugin-angular":' );
                assert.fileContent( 'package.json', '"eslint-config-prodest-angular":' );
            } );
        } );

        describe( 'and using --pluginName argument', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withPrompts( { format: 'cjs' } )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .withArguments( [ context.appName ] )
                  .on( 'end', done );
            } );

            it( 'then generates the same pluginName in every file', () => {
                assert.fileContent( 'package.json', '"name": "meuPlugin"' );
                assert.fileContent( 'README.md', 'meuPlugin' );
                assert.fileContent( 'gulpfile.js', 'meuPlugin' );
            } );

            it( 'then generates plugin src files with plugin name', () => {
                assert.file( [
                    'lib/plugin/index.js',
                    `lib/plugin/${context.appName}.controller.js`,
                    `lib/plugin/${context.appName}.controller.specs.js`,
                    `lib/plugin/${context.appName}.routes.js`,
                    `lib/plugin/${context.appName}.tpl.html`,
                    `lib/plugin/${context.appName}.css`
                ] );
            } );

            it( 'then generates  espm (ES na palma da m�o) emulator files', () => {

                // js
                assert.file( [
                    'lib/espmEmulator/espm.js',
                    'lib/espmEmulator/espm.controller.js',
                    'lib/espmEmulator/espm.routes.js',
                    'lib/espmEmulator/index.html'
                ] );

                //css
                assert.file( [
                    'lib/espmEmulator/css/espm-bootstrap-override.css',
                    'lib/espmEmulator/css/espm.css'
                ] );

                //img
                assert.file( [
                    'lib/espmEmulator/img/user.png',
                    'lib/espmEmulator/img/diamond-effect.png',
                    'lib/espmEmulator/img/brasao-governo-horizontal.png'
                ] );
            } );
        } );

        describe( 'and prompting github user name', () => {
            beforeEach( done => {
                yo.run( appPath )
                  .withOptions( {
                      'skip-install': true
                  } )
                  .withPrompts( {
                      githubUserName: context.githubUserName,
                      format: 'cjs'
                  } )
                  .withArguments( [ context.appName ] )
                  .on( 'end', done );
            } );

            it( 'then generates the same github username in every file', () => {
                assert.fileContent( 'package.json', '"format": "cjs"' );
                assert.fileContent( 'package.json', `"repository": "http://github.com/${context.githubUserName}/${context.appName}"` );
                assert.fileContent( 'gulpfile.js', `jspm link github:${context.githubUserName}/${context.appName}@dev -y` );
            } );
        } );
    } );
} );
