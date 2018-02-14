import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MicarritoPage } from './micarrito';

@NgModule({
  declarations: [
    MicarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(MicarritoPage),
  ],
})
export class MicarritoPageModule {}
