import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor( public app: App ) {}

  logout(alias,clave) 
  { 
    // remove tokens, api, etc...
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
