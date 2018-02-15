import { BaseLocalProvider } from './../../providers/base-local/base-local';
import { NetworkengineProvider } from './../../providers/networkengine/networkengine';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-micarrito',
  templateUrl: 'micarrito.html',
})
export class MicarritoPage {

  private carrito:  any;
  private url:      any;
  private puerto:   any;
  totalCarrito:     number;

  constructor( public navCtrl:   NavController,
               public navParams: NavParams,
               public netWork:   NetworkengineProvider,
               public baselocal: BaseLocalProvider,
               public funciones: FuncionesProvider ) {
      // direccion para rescatar las imagenes           
      this.url     = this.netWork.url;
      this.puerto  = this.netWork.puerto;
      // valor toital del pedido
      this.totalCarrito = 0;
  }

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

  ionViewWillEnter() {
    console.log('ionViewWillEnter()');
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter()');
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad()');
    this.carrito = this.funciones.miCarrito;
    this.totalCarrito = this.funciones.sumaCarrito();
  }

  ponerPedido() {
    this.funciones.msgAlert('PONER-PEDIDO','aqui enviaras el pedido a tu casero...')
  }

  quitarDelPedido( codigo ) {
    this.funciones.msgYesNo( 'Eliminar ítem', 'Desea eliminar este ítem?', 'Sí, elimine!', 'No, gracias', codigo );
  }  
  
}
