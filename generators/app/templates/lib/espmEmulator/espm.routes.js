function routesConfig( $stateProvider, $urlRouterProvider ) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise( '/<%= pluginName %>' );

    $stateProvider
        .state( 'espm', {
            url: '/',
            abstract: true,
            views: {
                page: {
                    //controller: 'EspmController as vm',
                    template: '<ui-view name="content"></ui-view>'
                }
            }
        } );
}

export default[ '$stateProvider', '$urlRouterProvider', routesConfig ];
