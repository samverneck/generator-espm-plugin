
var template = require('./<%= pluginName %>.tpl.html!text');

function <%= pluginName %>Routes($stateProvider) {
    $stateProvider
        .state('espm.<%= pluginName %>-principal', {
            url: '<%= pluginName %>',
            data: { title: '<%= capitalPluginName %>' },
            views: {
                content: {
                    controller: 'secomController as vm',
                    template: template
                }
            }
        });
}

module.exports = [
    '$stateProvider',
    secomRoutes
];

