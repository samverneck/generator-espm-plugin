
// emula a aplcação ES na palma da mão (espm)

// jspm packages
import 'jquery';
import angular from 'angular/angular';
import 'angular-ui-router';
import 'font-awesome'; //eslint-disable-line no-unused-vars

// só carrega css da aplicação depois de carregar bootstrap
System.import( 'bootstrap/css/bootstrap.css!' ).then( () => {
    System.import( 'lib/espmEmulator/css/espm-bootstrap-override.css!' );
    System.import( 'lib/espmEmulator/css/espm.css!' );
} );

// espm emulator
import espmRoutesConfig from './espm.routes';
import EspmController from './espm.controller';

// plugin detran
import pluginModule from '../plugin/index';

const dependencies = [
    pluginModule.name,
    'ui.router'
];

let espm = angular.module( 'espm', dependencies )
                 .config( espmRoutesConfig )                     // emula rota base da aplicação
                 .controller( 'espmController', EspmController ); // emula controller base da aplicação

// bootstrap espm app
angular.element( document ).ready( function() {
    angular.bootstrap( document, [ espm.name ], {
        strictDi: true
    } );
} );

export default espm;

