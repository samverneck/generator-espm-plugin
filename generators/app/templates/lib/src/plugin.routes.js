import template from './<%= pluginName %>.tpl.html!text';

function <%= pluginName %>Routes( $stateProvider ) {
    $stateProvider
        .state( 'app.<%= pluginName %>', {
            url: '<%= pluginName %>',
            data: { title: '<%= capitalPluginName %>' },
            views: {
                content: {
                    controller: '<%= pluginName %>Controller as vm',
                    template: template
                }
            }
        } );
}

export default[
    '$stateProvider',
    <%= pluginName %>Routes
];
