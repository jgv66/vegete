import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegistroPage } from './../registro/registro';
import { LoginPage } from './../login/login';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor( public navCtrl: NavController, 
               public navParams: NavParams ) {}

  login()  { 
    this.navCtrl.push( LoginPage );
  }

  signup() { 
    this.navCtrl.push( RegistroPage ); 
  }

}
