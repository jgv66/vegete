import { FuncionesProvider } from './../../providers/funciones/funciones';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NetworkengineProvider } from '../../providers/networkengine/networkengine';
import { BaseLocalProvider } from './../../providers/base-local/base-local';

import { NorecuerdoPage } from '../norecuerdo/norecuerdo';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  private usuario:    string;
  private clave:      string;
  private recordarme: boolean = true;
  public misCompras:  number = 5;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public netWork: NetworkengineProvider,
              public baseLocal: BaseLocalProvider,
              public funciones: FuncionesProvider ) {
  }

  ionViewWillEnter() 
    {
      this.baseLocal.obtenUltimoUsuario()
        .then( (pUsuario) => 
        {
          this.usuario    = pUsuario[0].usuario;
          this.clave      = pUsuario[0].clave;
          this.recordarme = pUsuario[0].recordarme;
        })
        .catch( err => console.log( 'lectura de usuario con error->', err ) );
    }

  logout() { this.navCtrl.pop() }

  noRecuerdo() { this.navCtrl.push( NorecuerdoPage ) }

  login( usuario, clave, recordarme ) { 
    this.funciones.cargaEspera();
    this.netWork.consultaUsuario( usuario, clave )
        .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( "ATENCION" , 'Ocurrió un error -> '+err ); }
                  )           
    }
  
    private revisaExitooFracaso( data )
    { 
      if ( data.length==0 )
            this.funciones.msgAlert('ATENCION','El usuario o su clave o ambos podrían estar incorrectos');
      else
          { this.funciones.msgAlert('Bienvenido !','Hola '+data[0].nombre );
            this.baseLocal.guardaUltimoUsuario( data );
            this.navCtrl.push( TabsPage, data[0], {animate:false} );
          } 
    }

}
