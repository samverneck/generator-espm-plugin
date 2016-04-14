/**
 * Agenda controller
 * @param {Object} $log - angular log service.
 * @constructor
 * @returns {void}
 */
function <%= capitalPluginName %>Controller( $log ) {
    var vm = this;
    vm.activate = activate;
    vm.nomePlugin = '<%= pluginName %>';

    ////////////////////////////////////////////////////////////////////////////

    /**
     * Ativa o controller
     *
     * @returns {void}
     */
    function activate() {
        $log.log( vm.nomePlugin + ' Controller ativado' );
    }
}

module.exports = [ '$log', <%= capitalPluginName %>Controller ];
