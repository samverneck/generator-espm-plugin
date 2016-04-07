class <%= capitalPluginName %>Controller {

    constructor() {
        this.activate();
    }

    activate() {
         console.log( '<%= capitalPluginName %> Controller ativado' );
    }
}

export default [ <%= capitalPluginName %>Controller ];

