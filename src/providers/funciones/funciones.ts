import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class FuncionesProvider {

  private loader:     any;
  public  misCompras: number = 0;
  public  miCarrito:  Array<{codigo: string, cantidad: number, precio: number}>;

  constructor( public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {
      this.miCarrito  = [{ codigo:'', cantidad:0, precio:0 }];
      this.misCompras = 0;
  }

  cargaEspera() {
    this.loader = this.loadingCtrl.create({
      content: "Favor esperar...",
      duration: 3000
      }); 
    this.loader.present();
  }

  descargaEspera() {
    this.loader.dismiss();
  }

  msgAlert( titulo, texto ) {
    let alert = this.alertCtrl.create(
      { title: titulo,
        subTitle: texto,
        buttons: ['OK']
      });
    alert.present();
  }

  msgYesNo( titulo, mensaje, textoSi, textoNo, cCodigo ) {
    let confirm = this.alertCtrl.create({
      title:   titulo,
      message: mensaje,
        buttons: [
            {
              text: textoSi,
              handler: () => {
                console.log( textoSi );
                this.quitarDelCarro( cCodigo );
                return true;
              }
            },
            {
              text: textoNo,
              handler: () => {
                console.log( textoNo );
              }
            }
          ]
        });
        confirm.present();
  }

  cuantasComprasTengo() {
    if ( this.aunVacioElCarrito() ) {
        this.misCompras = 0;
    } else {
        this.misCompras = this.miCarrito.length;
    }     
    return this.misCompras;
  }

  agregarACarro( pcodigo, pcantidad, pprecio ){
    if ( this.aunVacioElCarrito() ) {
        this.miCarrito[0].codigo   = pcodigo;
        this.miCarrito[0].cantidad = pcantidad;
        this.miCarrito[0].precio   = pprecio;
    } else {
        this.miCarrito.push({ codigo: pcodigo, cantidad: pcantidad, precio: pprecio });
    }
    this.misCompras = this.miCarrito.length ;
  }
  
  sumaCarrito() {
    let totalCarrito = 0;
    this.miCarrito.forEach( p => {
      totalCarrito += p.cantidad * p.precio;
    });
    console.log('totalCarrito',totalCarrito);
    return totalCarrito;
  }

  private aunVacioElCarrito() {
    return ( this.miCarrito.length == 1 && this.miCarrito[0].codigo == '' );
  }

  quitarDelCarro( pcodigo ) {
    if ( this.aunVacioElCarrito()!=true ) {
         for (var i = 0; i < this.miCarrito.length; i++) {
           if ( this.miCarrito[i].codigo == pcodigo ) {         
                this.miCarrito.splice(i, 1);
                break;
           }
         }
    };
    if ( this.miCarrito.length == 0 ) {
         this.miCarrito.push({ codigo: '', cantidad: 0, precio: 0 });
    }
    this.misCompras = this.miCarrito.length;
  }
  
  
}
