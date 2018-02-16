import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class FuncionesProvider {

  private loader:     any;
  public  misCompras: number = 0;
  public  miCarrito:  Array<{codigo: string, cantidad: number, precio: number, imagen: string}>;

  constructor( public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {
      this.initCarro();           
  }

  initCarro() {
    this.miCarrito  = [{ codigo:'', cantidad:0, precio:0, imagen:'' }];
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

  cuantasComprasTengo() {
    if ( this.aunVacioElCarrito() ) {
        this.misCompras = 0;
    } else {
        this.misCompras = this.miCarrito.length;
    }     
    return this.misCompras;
  }

  agregarACarro( producto ){
    if ( this.aunVacioElCarrito() ) {
        this.miCarrito[0].codigo   = producto.codigo;
        this.miCarrito[0].cantidad = producto.unidadminima;
        this.miCarrito[0].precio   = producto.precio;
        this.miCarrito[0].imagen   = producto.imagen;
    } else {
        this.miCarrito.push({ codigo:   producto.codigo, 
                              cantidad: producto.unidadminima, 
                              precio:   producto.precio, 
                              imagen:   producto.imagen });
    }
    this.misCompras = this.miCarrito.length ;
  }
  
  sumaCarrito() {
    let tot = 0;
    this.miCarrito.forEach( p => {
      tot += p.cantidad * p.precio;
    });
    return tot;
  }

  private aunVacioElCarrito() {
    return ( this.miCarrito.length == 1 && this.miCarrito[0].codigo == '' );
  }

  quitarDelCarro( pcodigo ) {
    if ( !this.aunVacioElCarrito() ) {
         for (var i = 0; i < this.miCarrito.length; i++) {
           if ( this.miCarrito[i].codigo == pcodigo ) {         
                this.miCarrito.splice(i, 1);
                break;
           }
         }
    };
    if ( this.miCarrito.length == 0 ) {
         this.initCarro();
    }
    this.misCompras = this.miCarrito.length;
  }


}
