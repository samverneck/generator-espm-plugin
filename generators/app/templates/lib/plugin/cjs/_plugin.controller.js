/**
 * Agenda controller
 * @param {Object} $log - angular log service.
 * @constructor
 * @returns {void}
 */
function <%= capitalPluginName %>Controller( $log ) {
    var vm = this;
    vm.activate = activate;

    vm.activate();

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    function activate() {
        $log.log( '<%= capitalPluginName %> Controller ativado' );
    }
}

module.exports = [ '$log', <%= capitalPluginName %>Controller ];
