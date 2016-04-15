/**
 * Agenda controller
 * @param {Object} $log - angular log service.
 * @constructor
 * @returns {void}
 */
class <%= capitalPluginName %>Controller {

    constructor( $log ) {
        this.logger = $log;
        this.nomePlugin = '<%= pluginName %>';
    }

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    activate() {
        this.logger.log( this.nomePlugin + ' Controller ativado' );
    }
}

export default [ '$log', <%= capitalPluginName %>Controller ];

