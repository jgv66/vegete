import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Productos } from './../../model/productos.model';
import { NetworkengineProvider } from '../../providers/networkengine/networkengine';
import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  producto:       Productos;
  private url:    any;
  private puerto: any;

  constructor( public navCtrl:   NavController, 
               public navParams: NavParams,
               public netWork:   NetworkengineProvider,
               public funciones: FuncionesProvider ) {
      // producto a desplegar           
      this.producto = this.navParams.get( "producto" );
      // direccion para rescatar las imagenes           
      this.url      = this.netWork.url;
      this.puerto   = this.netWork.puerto;
  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad DetallePage');*/
  }

  poneEnCarro( codigo, cantidad, precio ) {
    this.funciones.agregarACarro( codigo, cantidad, precio );
  }

  totalDelPedido() {
    this.funciones.msgAlert( 'ATENCION', 'La suma hasta ahora de su pedido es de : $'+this.funciones.sumaCarrito() );
  }


}
