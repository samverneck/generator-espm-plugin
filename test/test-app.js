'use strict';

let path = require( 'path' );
let yo = require( 'yeoman-test' );
let assert = require( 'yeoman-assert' );
let sinon = require( 'sinon' );

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

        it( 'should call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'should call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'should call spawnCommand once to serve plugin', () => {
            assert( generator.spawnCommand.calledWith( 'npm', [ 'run', 'serve' ] ) );
        } );
    } );


    describe( 'when skip-install === false and autoExec === false', () => {

        let generator;

        beforeEach( done => {
            yo.run( appPath )
               .withPrompts( { format: 'es6', autoExec: 'n' } )
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

        it( 'should call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'should call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledOnce );
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'should not call spawnCommand once to serve plugin', () => {
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

        it( 'should call npmInstall once', () => {
            assert( generator.npmInstall.calledOnce );
        } );

        it( 'should call spawnCommand once to install jspm packages', () => {
            assert( generator.spawnCommand.calledOnce );
            assert( generator.spawnCommand.calledWith( 'jspm', [ 'install', '-y' ] ) );
        } );

        it( 'should not call spawnCommand to serve plugin', () => {
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

        it( 'should never call npmInstall', () => {
            assert( generator.npmInstall.called === false );
        } );

        it( 'should never call spawnCommand', () => {
            assert( generator.spawnCommand.called === false );
        } );
    } );


    //==============================================================================================================================
    // ES6
    //==============================================================================================================================
    describe( 'with default settings (es6 format)', () => {
        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'es6' } )
              .withOptions( {
                  'skip-install': true
              } )
              .on( 'end', done );
        } );

        it( 'generates config files', () => {
            assert.file( [
                'package.json',
                'README.md',
                'gulpfile.js',
                'config.js',
                '.eslintrc.json',
                '.gitignore',
                'system.yuml.js'
            ] );
        } );

        it( 'plugin depends on eslint-config-prodest', () => {
            assert.fileContent( 'package.json', '"eslint-config-idiomatic":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest":' );
        } );


        it( 'plugin depends on eslint-config-prodest-angular', () => {
            assert.fileContent( 'package.json', '"eslint-plugin-angular":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest-angular":' );
        } );
    } );


    describe( 'when using --pluginName argument (es6 format)', () => {
        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'es6' } )
              .withOptions( {
                  'skip-install': true
              } )
              .withArguments( [ context.appName ] )
              .on( 'end', done );
        } );


        it( 'generates the same pluginName in every file', () => {
            assert.fileContent( 'package.json', '"name": "meuPlugin"' );
            assert.fileContent( 'README.md', 'meuPlugin' );
            assert.fileContent( 'gulpfile.js', 'meuPlugin' );
        } );

        it( 'generates plugin src files with plugin name', () => {
            assert.file( [
                'lib/plugin/index.js',
                `lib/plugin/${context.appName}.controller.js`,
                `lib/plugin/${context.appName}.controller.specs.js`,
                `lib/plugin/${context.appName}.routes.js`,
                `lib/plugin/${context.appName}.tpl.html`,
                `lib/plugin/${context.appName}.css`
            ] );
        } );

        it( 'generates  espm (ES na palma da m�o) emulator files', () => {

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


    describe( 'when prompting github user name (es6 format)', () => {
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

        it( 'generates the same github username in every file', () => {
            assert.fileContent( 'package.json', '"format": "es6"' );
            assert.fileContent( 'package.json', `"repository": "http://github.com/${context.githubUserName}/${context.appName}"` );
            assert.fileContent( 'gulpfile.js', `jspm link github:${context.githubUserName}/${context.appName}@dev -y` );
        } );
    } );


    //==============================================================================================================================
    // CommonJS
    //==============================================================================================================================
    describe( 'with default settings (cjs format)', () => {
        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'cjs' } )
              .withOptions( {
                  'skip-install': true
              } )
              .on( 'end', done );
        } );

        it( 'generates config files', () => {
            assert.file( [
                'package.json',
                'README.md',
                'gulpfile.js',
                'config.js',
                '.eslintrc.json',
                '.gitignore',
                'system.yuml.js'
            ] );
        } );


        it( 'plugin depends on eslint-config-prodest', () => {
            assert.fileContent( 'package.json', '"eslint-config-idiomatic":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest":' );
        } );


        it( 'plugin depends on eslint-config-prodest-angular', () => {
            assert.fileContent( 'package.json', '"eslint-plugin-angular":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest-angular":' );
        } );
    } );

    describe( 'when using --pluginName argument (cjs format)', () => {
        beforeEach( done => {
            yo.run( appPath )
              .withPrompts( { format: 'cjs' } )
              .withOptions( {
                  'skip-install': true
              } )
              .withArguments( [ context.appName ] )
              .on( 'end', done );
        } );


        it( 'generates the same pluginName in every file', () => {
            assert.fileContent( 'package.json', '"name": "meuPlugin"' );
            assert.fileContent( 'README.md', 'meuPlugin' );
            assert.fileContent( 'gulpfile.js', 'meuPlugin' );
        } );

        it( 'generates plugin src files with plugin name', () => {
            assert.file( [
                'lib/plugin/index.js',
                `lib/plugin/${context.appName}.controller.js`,
                `lib/plugin/${context.appName}.controller.specs.js`,
                `lib/plugin/${context.appName}.routes.js`,
                `lib/plugin/${context.appName}.tpl.html`,
                `lib/plugin/${context.appName}.css`
            ] );
        } );

        it( 'generates  espm (ES na palma da m�o) emulator files', () => {

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

    describe( 'when prompting github user name (cjs format)', () => {
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

        it( 'generates the same github username in every file', () => {
            assert.fileContent( 'package.json', '"format": "cjs"' );
            assert.fileContent( 'package.json', `"repository": "http://github.com/${context.githubUserName}/${context.appName}"` );
            assert.fileContent( 'gulpfile.js', `jspm link github:${context.githubUserName}/${context.appName}@dev -y` );
        } );
    } );
} );
