class EspmController {

    constructor( $log ) {
        this.log = $log;
        this.activate();
    }

    activate() {
        this.userName = 'Daniel Hoisel';
        this.appName = 'ES na Palma da Mão';

        this.log.info( 'Aplicação inicializada' );
    }
}

export default [ '$log', EspmController ];
