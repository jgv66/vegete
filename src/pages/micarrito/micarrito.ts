/*
ionViewDidLoad: Se llama únicamente cuando cargas una página en memoria (push). Este evento NO se lanza si entras por segunda vez en una vista que ya está cacheada. Es un buen sitio para tareas relacionadas con la inicialización de la vista.
ionViewWillEnter: Se ejecuta cuando entras en una página, antes de cargarla. Utilízalo para tareas que se deben realizar siempre que entras en la vista, exista ya o no (activar listeners de eventos, actualizar una tabla, etc).
ionViewDidEnter: Se ejecuta cuando entras en una página, después de cargarla. Ahora ésta es la página activa. Muy similar a la anterior.
ionViewWillLeave: Se ejecuta cuando sales de una página, justo antes de salir. Utilízalo para esa lógica que necesitas siempre que sales de la vista (desactivar listeners, etc).
ionViewDidLeave: Se ejecuta cuando sales de una página, al acabar de salir. Ahora ésta ya no es la página activa. Muy similar a la anterior.
ionViewWillUnload: Se ejecuta cuando vas a destruir por completo una página (al hacer pop).
ionViewCanEnter: Se ejecuta antes de entrar en una vista y te permite controlar si realmente puedes entrar en la vista o no (devolviendo true o false).
ionViewCanLeave: Se ejecuta antes de salir de una vista y te permite controlar si realmente puedes salir de la vista o no.
*/

import { BaseLocalProvider } from './../../providers/base-local/base-local';
import { NetworkengineProvider } from './../../providers/networkengine/networkengine';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-micarrito',
  templateUrl: 'micarrito.html',
})
export class MicarritoPage {

  private cod_usr:  any;
  private carrito:  any;
  private url:      any;
  private puerto:   any;
  private empresa:  number;
  totalCarrito:     number;

  constructor( public navCtrl:   NavController,
               public navParams: NavParams,
               public netWork:   NetworkengineProvider,
               public baselocal: BaseLocalProvider,
               public funciones: FuncionesProvider,
               public alertCtrl: AlertController,
               public app:       App ) {
      // direccion para rescatar las imagenes           
      this.url     = this.netWork.url;
      this.puerto  = this.netWork.puerto;
      // valor toital del pedido
      this.totalCarrito = 0;
      this.cod_usr      = this.baselocal.user[0].usuario ;
      this.empresa      = 1;
  }

  ionViewWillEnter() {
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  ionViewDidEnter() {
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  ionViewDidLoad() {
    this.carrito      = this.funciones.miCarrito;
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  quitarDelPedido( codigo ) {
    let confirm = this.alertCtrl.create({
      title:   'Eliminar ítem',
      message: 'Desea eliminar este ítem?',
      buttons: [
          {
            text: 'Sí, elimine!',
            handler: () => {
              this.funciones.quitarDelCarro( codigo );
            }
          },
          {
            text: 'No, gracias',
            handler: () => {
              console.log( 'No borra' );
            }
          }
        ]
      });
      confirm.present();
  }  
  
  sumaCarrito() {
    return this.funciones.sumaCarrito();
  }

  enviarPedido() {
    console.log('enviarPedido()',this.cod_usr);
    this.funciones.cargaEspera();
    this.netWork.enviarPedidoAlServidor( this.empresa, this.cod_usr, this.carrito )
        .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data ); },
                    err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( "ATENCION" , 'Ocurrió un error -> '+err ); }
      )           
  }

  private revisaExitooFracaso( data ) { 
    if ( data.length==0 ) {
        this.funciones.msgAlert('ATENCION','Los datos ingresados podrían estar incorrectos')
    } else { 
      try { 
        // ok= mssql, affected..= mysql
        if ( data.resultado == 'ok' ) {
            this.funciones.msgAlert('PEDIDO Nro.'+data.numero,'Su Nro. de pedido es el '+data.numero+'. Ya ha llegado al vendedor. Una copia será despachada a su correo para verificación. Gracias por utilizar nuestro carro de compras.' );
            this.funciones.initCarro();
            const root = this.app.getRootNav();
            root.popToRoot();
        } else {
          this.revisaError(data);
        }
      }
      catch (e) {
        this.funciones.msgAlert('ATENCION','Ocurrió un error al intentar guardar el pedido ->'+e ); 
      }
    } 
  }

  private revisaError( data ) {
    // constraint= mssql, Duplicate entry= mysql
    console.log( 'errores de grabacion ', data )
    /*
    if ( data.mensaje.indexOf('constraint') || data.mensaje.indexOf('Duplicate') ) { 
      this.funciones.msgAlert('ATENCION','El nombre de usuario ya existe, cambie y reintente' ); 
    } 
    else { 
      this.funciones.msgAlert('ATENCION','Server error: '+data.mensaje ); 
    }
    */
  }




}
