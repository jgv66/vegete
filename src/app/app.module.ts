import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from './../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroPage } from './../pages/registro/registro';
import { NorecuerdoPage } from './../pages/norecuerdo/norecuerdo';
import { WelcomePage } from './../pages/welcome/welcome';
import { LogoutPage } from './../pages/logout/logout';
import { DetallePage } from './../pages/detalle/detalle';
import { MicarritoPage } from './../pages/micarrito/micarrito';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkengineProvider } from '../providers/networkengine/networkengine';
import { BaseLocalProvider } from '../providers/base-local/base-local';
import { FuncionesProvider } from '../providers/funciones/funciones';
import { ContactPage } from '../pages/contact/contact';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    RegistroPage,
    NorecuerdoPage,
    ContactPage,
    LogoutPage,
    DetallePage,
    MicarritoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    RegistroPage,
    NorecuerdoPage,
    ContactPage,
    LogoutPage,
    DetallePage,
    MicarritoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkengineProvider,
    BaseLocalProvider,
    FuncionesProvider
  ]
})
export class AppModule {}
