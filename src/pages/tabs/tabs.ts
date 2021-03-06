import { Component } from '@angular/core';

import { FuncionesProvider } from './../../providers/funciones/funciones';

import { HomePage }       from '../home/home';
import { LogoutPage }     from '../logout/logout';
import { MicarritoPage }  from '../micarrito/micarrito';
import { ContactPage }    from '../contact/contact';
import { MisPedidosPage } from '../mis-pedidos/mis-pedidos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MicarritoPage;
  tab3Root = MisPedidosPage
  tab4Root = ContactPage;
  tab5Root = LogoutPage;

  public misCompras: number;
  public mipedido:   any;

  constructor( public funciones: FuncionesProvider ) {
    this.misCompras = 0;
    this.mipedido   = [];
  }

  cuantasComprasTengo() {
    return this.funciones.cuantasComprasTengo();
  }

}
