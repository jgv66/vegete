import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor( public app: App,
               public funciones: FuncionesProvider ) {}

  logout() { 
    this.funciones.initCarro();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
