/**
 * Agenda controller
 * @param {Object} $log - angular log service.
 * @constructor
 * @returns {void}
 */
class <%= capitalPluginName %>Controller {

    constructor( $log ) {
        this.logger = $log;
        this.activate();
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate(){
        this.logger.log( '<%= capitalPluginName %> Controller ativado' );
    }
}

export default [ '$log', <%= capitalPluginName %>Controller ];

