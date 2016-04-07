 class EspmController {
     constructor() {
         'ngInject';
         this.activate();
     }

     activate() {
         this.userName = 'Daniel Hoisel';
         this.appName = 'ES na Palma da Mão';

         console.info( 'Aplicação inicializada' );
     }
}

 export default [ EspmController ];
