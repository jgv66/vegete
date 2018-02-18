import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { NetworkengineProvider } from '../../providers/networkengine/networkengine';
import { Usuario } from './../../model/usuario.model';
import { BaseLocalProvider } from '../../providers/base-local/base-local';
import { FuncionesProvider } from '../../providers/funciones/funciones';
import { Productos } from './../../model/productos.model';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user:       Usuario;
  private productos:  Productos; 
  private url:        any;
  private puerto:     any

  constructor( public navCtrl:      NavController,
               public baseLocal:    BaseLocalProvider,
               public netWork:      NetworkengineProvider,
               public funciones:    FuncionesProvider ) {
      this.url        = this.netWork.url;   // direccion para rescatar las imagenes           
      this.puerto     = this.netWork.puerto;
  }

  ngOnInit() {  
    this.baseLocal.obtenUltimoUsuario().then( (pUsuario) => { this.user = pUsuario } );
    this.cargaProductos();  
  }

  cargaProductos() {
      this.funciones.cargaEspera();
      this.netWork.traeUnaLista( 'productos', 'codigo' )
          .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data ); },
                      err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION' ,err );  }
                    )
  }

  private revisaExitooFracaso( data ) { 
    if ( data.length==0 ) {
        this.funciones.msgAlert('ATENCION','La lista de productos aún no está disponible. Intente luego.');
    } else if ( data.length>0 ) {
        this.productos = data;
    } else {
        this.funciones.msgAlert('ATENCION','Ocurrió un error al intentar rescatar la lista de productos' ); 
    }
  }

  getDetalleProducto( producto: Productos ) {
      this.navCtrl.push( DetallePage, { producto: producto } );
  }
}
