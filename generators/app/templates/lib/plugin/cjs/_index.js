require('angular-ui-router');
require('./<%= pluginName %>.css!');
var angular = require('angular');
var <%= capitalPluginName %>Controller = require('./<%= pluginName %>.controller');
var <%= pluginName %>Routes = require('./<%= pluginName %>.routes');

var dependencies = [
    'ui.router'
];

module.exports = angular.module('espm-plugin-<%= pluginName %>', dependencies)
                        .controller('<%= pluginName %>Controller', <%= capitalPluginName %>Controller)
                        .config(<%= pluginName %>Routes); 

