import { BaseLocalProvider } from './../../providers/base-local/base-local';
import { Component } from '@angular/core';
import { IonicPage, NavController, App  } from 'ionic-angular';
import { NetworkengineProvider } from '../../providers/networkengine/networkengine';
import { Usuario } from '../../model/usuario.model';
import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public usr: Usuario ;

  constructor(public navCtrl:   NavController, 
              public netWork:   NetworkengineProvider,
              public funciones: FuncionesProvider,
              public baseLocal: BaseLocalProvider,
              private app:      App ) {
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
        // ok= mssql, affected..= mysql
        if ( data.resultado == 'ok' || data.affectedRows == 1 ) {
            this.funciones.msgAlert('Hola '+usr.nombre.trim(),'Gracias por registrarte. Ahora ingresa con tus datos para acceder a la lista de compras' );
            //this.baseLocal.guardaUltimoUsuario( usr ); 
            //this.navCtrl.push( TabsPage, usr, {animate:false} );
            const root = this.app.getRootNav();
            root.popToRoot();
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
    // constraint= mssql, Duplicate entry= mysql
    if ( data.mensaje.indexOf('constraint') || data.mensaje.indexOf('Duplicate') ) { 
      this.funciones.msgAlert('ATENCION','El nombre de usuario ya existe, cambie y reintente' ); 
    } 
    else { 
      this.funciones.msgAlert('ATENCION','Server error: '+data.mensaje ); 
    }
  }
  
}

