// emula a aplicação ES na palma da mão (espm)

// jspm packages
import 'font-awesome';
import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import espmRoutesConfig from './espm.routes';
import EspmController from './espm.controller';
import pluginModule from '../plugin/index'; //eslint-disable-line no-unused-vars

// só carrega css da aplicação depois de carregar bootstrap
System.import( 'bootstrap/css/bootstrap.css!' ).then( () => {
    System.import( 'lib/espmEmulator/css/espm-bootstrap-override.css!' );
    System.import( 'lib/espmEmulator/css/espm.css!' );
} );

const dependencies = [
    pluginModule.name,
    'ui.router'
];
let espm = angular.module( 'espm', dependencies )
                  .config( espmRoutesConfig )                     // emula rota base da aplicação
                  .controller( 'espmController', EspmController ); // emula controller base da
                                                                   // aplicação

// bootstrap espm app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ espm.name ], {
        strictDi: true
    } );
} );

export default espm;
