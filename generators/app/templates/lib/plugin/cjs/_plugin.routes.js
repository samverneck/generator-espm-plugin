
var template = require('./<%= pluginName %>.tpl.html!text');

function <%= pluginName %>Routes($stateProvider) {
    $stateProvider
        .state('espm.<%= pluginName %>-principal', {
            url: '<%= pluginName %>',
            data: { title: '<%= capitalPluginName %>' },
            views: {
                content: {
                    controller: '<%= pluginName %>Controller as vm',
                    template: template
                }
            }
        });
}

module.exports = [
    '$stateProvider',
    <%= pluginName %>Routes
];

se