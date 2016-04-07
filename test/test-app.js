'use strict';

var path = require( 'path' );
var yo = require( 'yeoman-test' );
var assert = require( 'yeoman-assert' );

describe( 'espm-plugin', function() {
    var appPath = path.join( __dirname, '../generators/app' );
    var context = {
        appName: 'meuPlugin',
        githubUserName: 'hoisel'
    };

    describe( 'with default settings', function() {
        beforeEach( function( done ) {
            yo.run( appPath )
              .withOptions( {
                  'skip-install': true
              } )
              .on( 'end', done );
        } );

        it( 'generates config files', function() {
            assert.file( [
                'package.json',
                'README.md',
                'gulpfile.js',
                'config.js',
                'index.html',
                '.eslintrc.json',
                '.gitignore'
            ] );
        } );


        it( 'plugin depends on eslint-config-prodest', function() {
            assert.fileContent( 'package.json', '"eslint-config-idiomatic":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest":' );
        } );


        it( 'plugin depends on eslint-config-prodest-angular', function() {
            assert.fileContent( 'package.json', '"eslint-plugin-angular":' );
            assert.fileContent( 'package.json', '"eslint-config-prodest-angular":' );
        } );
    } );


    describe( 'when using --pluginName argument', function() {
        beforeEach( function( done ) {
            yo.run( appPath )
              .withOptions( {
                  'skip-install': true
              } )
              .withArguments( [ context.appName ] )
              .on( 'end', done );
        } );


        it( 'generates the same pluginName in every file', function() {
            assert.fileContent( 'package.json', '"name": "meuPlugin"' );
            assert.fileContent( 'README.md', 'meuPlugin' );
            assert.fileContent( 'gulpfile.js', 'meuPlugin' );
        } );

        it( 'generates plugin src files with plugin name', function() {
            assert.file( [
                'lib/src/index.js',
                'lib/src/' + context.appName + '.controller.js',
                'lib/src/' + context.appName + '.controller.specs.js',
                'lib/src/' + context.appName + '.routes.js',
                'lib/src/' + context.appName + '.tpl.html',
                'lib/src/' + context.appName + '.css'
            ] );
        } );
    } );


    describe( 'when prompting github user name', function() {
        beforeEach( function( done ) {
            yo.run( appPath )
              .withOptions( {
                  'skip-install': true
              } )
              .withPrompts( { githubUserName: context.githubUserName } )
              .withArguments( [ context.appName ] )
              .on( 'end', done );
        } );

        it( 'generates the same github username in every file', function() {
            assert.fileContent( 'package.json', '"repository": "http://github.com/' + context.githubUserName + '/' + context.appName );
            assert.fileContent( 'gulpfile.js', 'jspm link github:' + context.githubUserName + '/' + context.appName + '@dev -y' );
        } );
    } );
} );
