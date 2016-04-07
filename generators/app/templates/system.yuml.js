System.trace = true;

window.showModuleRelationships = function() {

    var name;
    var definitions;
    var dependencies;
    var modules;
    var moduleDefinitions;
    var dependencyDefinitions = [];

    modules = Object.keys( System.loads ).map( function( moduleName ) {
        return System.loads[ moduleName ];
    } );

    function displayName( module ) {
        return module.replace( System.baseURL, '' );
    }

    moduleDefinitions = modules.map( function( module ) {
        name = displayName( module.name );
        return '[' + name + '|' + module.metadata.format + ']';
    } );



    modules.filter( function( module ) {
        return module.deps.length > 0;
    } )
    .forEach( function( module ) {
        name = displayName( module.name );

        dependencies = module.deps.map( function( dependency ) {
            return System.normalizeSync( dependency, module.name, module.address );
        } )
        .map( displayName )
        .map( function( dependencyName ) {
            return '[' + name + ']->[' + dependencyName + ']';
        } );

        dependencyDefinitions = dependencyDefinitions.concat( dependencies );
    } );

    definitions = moduleDefinitions.concat( dependencyDefinitions );

    definitions = definitions.filter( function( definition ) {
        return definition.indexOf( 'jspm_packages' ) === -1;
    } );

    window.open( 'http://yuml.me/diagram/plain/class/' + definitions );
};
