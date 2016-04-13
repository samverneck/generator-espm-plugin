var template = require( './<%= pluginName %>.tpl.html!text' );

/**
 * Rotas para o plugin
 * @param {Object} $stateProvider - ui-route $stateProvider.
 * @returns {void}
 */
function <%=pluginName%>Routes( $stateProvider ){
    $stateProvider
        .state( 'espm.<%= pluginName %>-principal', {
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

module.exports = [
    '$stateProvider', <%=pluginName%>Routes
];

