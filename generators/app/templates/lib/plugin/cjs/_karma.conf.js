var browsers = [ 'PhantomJS' ]; // para builds locais
var coverage_reporters = [ { type: 'text' } ];
var reporters = [ 'mocha', 'coverage' ];

if ( process.env.TRAVIS ) {

    console.log( 'Executando no Travis: enviando coveralls' );

    coverage_reporters.push( {
        type: 'lcov',
        subdir: 'report-lcov'
    } );
    reporters.push( 'coveralls' );
} else {

    console.log( 'Executando localmente: não enviando coveralls' );

    coverage_reporters.push( {
        type: 'html',
        subdir: 'report-html'
    } );
}

module.exports = function( config ) {
    config.set( {

        frameworks: [ 'jspm', 'mocha', 'chai', 'sinon' ],

        jspm: {
            loadFiles: [
                'lib/plugin/**/*.specs.js', 'lib/plugin/index.js'
            ],
            serveFiles: [
                'lib/plugin/**/*.css', 'lib/plugin/**/*.html', 'lib/plugin**/!(*specs).js'
            ]
        },

        preprocessors: {
            // - Arquivos fontes para os quais queremos gerar coverage
            // - Não inclua arquivos de testes ou bibliotecas
            // - Esses arquivos serão instrumentados pelo Istanbul
            'lib/plugin/**/!(*specs).js': [ 'coverage' ]
        },

        coverageReporter: {
            dir: 'coverage/',
            reporters: coverage_reporters
        },

        proxies: {
            '/node_modules': '/base/node_modules',
            '/jspm_packages/': '/base/jspm_packages/',
            '/lib/': '/base/lib/'
        },

        reporters: reporters,
        browsers: browsers,
        singleRun: true
    } );
};
