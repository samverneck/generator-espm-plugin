'use-strict';

/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

//var angular = require( 'angular' );
var ngMocks = require( 'angular-mocks' );
var module = ngMocks.module;
var inject = ngMocks.inject;
var expect = chai.expect;

/**
 * Unit-tests para <%= pluginName %> controller.
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( '<%= capitalPluginName %>Controller', function() {

    var $controller;
    var $scope;
    var $rootScope;
    var $log;
    var Controller;

    beforeEach( module( 'espm-plugin-<%= pluginName %>' ) );

    // injeta serviços do angular usados nos tests
    beforeEach( inject( function( _$controller_, _$log_, _$rootScope_ ) {
        $controller = _$controller_;
        $log = _$log_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    } ) );

    // instancia o controller
    beforeEach( function() {
        Controller = $controller( '<%= pluginName %>Controller', {
            $scope: $scope,
            $log: $log
        } );
    } );

    describe( '(antes de ser ativado):', function() {
        it( 'então expõe para a view o nome do plugin', function() {
            expect( Controller.nomePlugin ).to.not.be.undefined;
            expect( Controller.nomePlugin ).to.equal( '<%= pluginName %>' );
        } );
    } );

    describe( '(durante ativação):', function() {

        beforeEach( function() {
            Controller.activate();
        } );

        it( 'então exibe mensagem de ativação', function() {
            expect( $log.log.logs[ 0 ] ).to.deep.equal( [ '<%= pluginName %> Controller ativado' ] );
        } );
    } );
} );


