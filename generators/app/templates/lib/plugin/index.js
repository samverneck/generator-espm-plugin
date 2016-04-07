import angular from 'angular';
import 'angular-ui-router';
import './<%= pluginName %>.css!';
import <%= capitalPluginName %>Controller from './<%= pluginName %>.controller';
import <%= pluginName %>Routes from './<%= pluginName %>.routes';

const dependencies = [
    'ui.router'
];

export default angular.module( 'espm-plugin-<%= pluginName %>', dependencies )
                      .controller( '<%= pluginName %>Controller', <%= capitalPluginName %>Controller )
                      .config( <%= pluginName %>Routes ); 
