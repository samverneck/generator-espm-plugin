function <%= capitalPluginName %>Controller() {
    var vm = this;
    vm.activate = activate;

    vm.activate();

    ////////////////////////////////////////////////////////////////////////////
    
    function activate() {
        console.log('<%= capitalPluginName %> Controller ativado');
    }
}

module.exports = [<%= capitalPluginName %>Controller];
