var angular = require( 'angular' );
var <%= capitalPluginName %>Controller = require( './<%= pluginName %>.controller' );
var <%= pluginName %>Routes = require( './<%= pluginName %>.routes' );
require( 'angular-ui-router' );
require( './<%= pluginName %>.css!' );

module.exports = angular.module( 'espm-plugin-<%= pluginName %>', [ 'ui.router' ] )
                        .controller( '<%= pluginName %>Controller', <%= capitalPluginName %>Controller )
                        .config( <%= pluginName %>Routes );

