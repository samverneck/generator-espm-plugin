/*
 eslint
 no-undef: 0,
 dot-notation: 0,
 angular/di: 0,
 no-unused-expressions: 0
 */

//let angular = require( 'angular' );
import { module, inject } from 'angular-mocks';
let expect = chai.expect;

/**
 * Unit-tests para <%= pluginName %> controller.
 *
 * Referência de unit-tests em angularjs:
 * http://www.bradoncode.com/tutorials/angularjs-unit-testing/
 */
describe( '<%= capitalPluginName %>Controller', () => {

    let $controller;
    let $scope;
    let $rootScope;
    let $log;
    let Controller;

    beforeEach( module( 'espm-plugin-<%= pluginName %>' ) );

    // injeta serviços do angular usados nos tests
    beforeEach( inject( ( _$controller_, _$log_, _$rootScope_ ) => {
        $controller = _$controller_;
        $log = _$log_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    } ) );

    // instancia o controller
    beforeEach( () => {
        Controller = $controller( '<%= pluginName %>Controller', {
            $scope: $scope,
            $log: $log
        } );
    } );

    describe( '(antes de ser ativado):', () => {
        it( 'então expõe para a view o nome do plugin', () => {
            expect( Controller.nomePlugin ).to.not.be.undefined;
            expect( Controller.nomePlugin ).to.equal( '<%= pluginName %>' );
        } );
    } );

    describe( '(durante ativação):', () => {

        beforeEach( () => {
            Controller.activate();
        } );

        it( 'então exibe mensagem de ativação', () => {
            expect( $log.log.logs[ 0 ] ).to.deep.equal( [ '<%= pluginName %> Controller ativado' ] );
        } );
    } );
} );


