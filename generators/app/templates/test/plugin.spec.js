import { Plugin } from 'lib/index';

describe( 'Plugin', function() {
    it( 'returns world', function() {
        let plugin = new Plugin();
        expect( plugin.sayHello() ).to.equal( 'hello' );
    } );
} );
