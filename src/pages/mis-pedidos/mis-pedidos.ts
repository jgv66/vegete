import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FuncionesProvider } from '../../providers/funciones/funciones';
import { BaseLocalProvider } from '../../providers/base-local/base-local';
import { NetworkengineProvider } from '../../providers/networkengine/networkengine';

@IonicPage()
@Component({
  selector: 'page-mis-pedidos',
  templateUrl: 'mis-pedidos.html',
})
export class MisPedidosPage {

  private pedidos: any;
  private cod_usr: any;

  constructor( public navCtrl: NavController, 
               public navParams: NavParams,
               private funciones: FuncionesProvider,
               private baselocal: BaseLocalProvider,
               private netWork:   NetworkengineProvider,
               private alertCtrl: AlertController ) {
      this.cod_usr = this.baselocal.user[0].usuario;
  }

  ngOnInit() {  
    this.cargaPedidos();  
  }

  verPedido( id_pedido ) {
    this.funciones.msgAlert('Su Pedido','aqui se verá su pedido' ); 
  }

  cargaPedidos() {
      //this.cod_usr = this.baselocal.user.usuario;
      this.funciones.cargaEspera();
      this.netWork.traeUnaLista( 'vista_pedidos', 'fechapedido desc',null, " usuario = '"+this.cod_usr+"' " )
          .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data, 'leer', null ); },
                      err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION' ,err );  }
                    )
  }

  quitarPedido( id_pedido ) {
    let confirm = this.alertCtrl.create({
      title:   'ELIMINAR PEDIDO',
      message: 'Los pedidos solo pueden ser rechazados con 48 horas (2 días) de antelación al dia de despacho, está seguro que desea eliminar este pedido?',
      buttons: [
          {
            text: 'Sí, elimine pedido',
            handler: () => {
              //this.funciones.eliminarPedido( id_pedido );
              this.funciones.cargaEspera();
              this.netWork.eliminaPedidoDelServidor( id_pedido )
                  .subscribe( data => { this.funciones.descargaEspera(); this.revisaExitooFracaso( data, 'eliminar', id_pedido ); },
                              err  => { this.funciones.descargaEspera(); this.funciones.msgAlert( 'ATENCION' ,err );  }
                            )
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

  private revisaExitooFracaso( data, tipo, id_pedido ) { 
    if ( tipo =='leer' ) {
      if ( data.length==0 ) {
          this.funciones.msgAlert('ATENCION','La lista de pedidos aún no está disponible. Intente luego.');
      } else if ( data.length>0 ) {
          this.pedidos = data;
      } else {
          this.funciones.msgAlert('ATENCION','Ocurrió un error al intentar rescatar la lista de pedidos' ); 
      }
    } else if ( tipo =='eliminar' ) {
      if ( data.length==0 ) {
        this.funciones.msgAlert('ATENCION','El pedido ya no existe. Favor comunicarse con su vendedor e informar esta anomalía');
      } else if ( data.resultado=="ok" ) {
        this.funciones.msgAlert('ATENCION','El pedido fue anulado. Gracias por su oportuna información');
        this.pedidos = null;
        this.cargaPedidos();
      } else if ( data.resultado=="fuera de fecha" ) {
        this.funciones.msgAlert('CUIDADO','El pedido no puede anularse, ya esta siendo despachado');
      } else {
        this.funciones.msgAlert('ATENCION','Ocurrió un error al intentar anular su pedido' ); 
      }
    }
  }  
  
}
