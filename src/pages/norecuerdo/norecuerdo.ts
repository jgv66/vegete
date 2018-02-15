import { FuncionesProvider } from './../../providers/funciones/funciones';
import { NetworkengineProvider } from './../../providers/networkengine/networkengine';
import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-norecuerdo',
  templateUrl: 'norecuerdo.html',
})
export class NorecuerdoPage {

  email: string;

  constructor( public app: App,
               public netWork: NetworkengineProvider,
               public funciones: FuncionesProvider ) {
  }

  enviarCorreo( cEmail ) {
    this.netWork.sendMail( cEmail )
    .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data ); },
                err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( "ATENCION" , 'Ocurrió un error -> '+err ); }
              )   
  }

  private revisaExitooFracaso( data ) { 
    if ( data.length==0 )
          this.funciones.msgAlert('ATENCION','El correo proporcionado quizás no es el correcto.');
    else
        { this.funciones.msgAlert('ATENCION','Un correo electrónico será enviado en algunos instantes. Revise su bandeja de entrada.' );
          // remove tokens, api, etc...
          const root = this.app.getRootNav();
          root.popToRoot();
        } 
  }

}
