import { BaseLocalProvider } from './../../providers/base-local/base-local';
import { Component } from '@angular/core';
import { IonicPage, NavController  } from 'ionic-angular';
import { NetworkengineProvider } from '../../providers/networkengine/networkengine';
import { Usuario } from '../../model/usuario.model';
import { TabsPage } from '../tabs/tabs';
import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public usr: Usuario ;

  constructor(public navCtrl:     NavController, 
              public netWork:     NetworkengineProvider,
              public funciones:   FuncionesProvider,
              public baseLocal:   BaseLocalProvider ) {
     this.usr = { usuario:'',clave:'',recordarme:false};
  }
  
  logout() { 
    this.navCtrl.pop() 
  }

  registrarUsuario( usr ) { 
    this.funciones.cargaEspera(); 
    // llamada al api para crear y devolver el registro recien insertado...
    this.netWork.crearUsuario( usr )
        .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data, usr ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION (RegUsr)' ,err );  }
                  )
  }

  revisaExitooFracaso( data, usr ) { 
    if ( data.length==0 ) {
        this.funciones.msgAlert('ATENCION','Los datos ingresados podrían estar incorrectos')
    } else { 
      try { 
        if ( data.resultado == 'ok' ) {
            this.funciones.msgAlert('Bienvenido !','Hola '+usr.nombre );
            this.baseLocal.guardaUltimoUsuario( usr );
            this.navCtrl.push( TabsPage, usr, {animate:false} );
        } else {
          this.revisaError(data);
        }
      }
      catch (e) {
        this.funciones.msgAlert('ATENCION','Ocurrió un error al intentar rescatar el nuevo usuario ->'+e ); 
      }
    } 
  }

  revisaError( data ) {
    if ( data.mensaje.indexOf('constraint') || data.mensaje.indexOf('Duplicate entry') ) { 
      this.funciones.msgAlert('ATENCION','El nombre de usuario ya existe, cambie y reintente' ); 
    } 
    else { 
      this.funciones.msgAlert('ATENCION','Server error: '+data.mensaje ); 
    }
  }
  
}

