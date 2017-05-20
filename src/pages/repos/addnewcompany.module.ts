import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddnewCompany } from './addnewcompany';

@NgModule({
  declarations: [
    AddnewCompany,
  ],
  imports: [
    IonicPageModule.forChild(AddnewCompany),
  ],
  exports: [
    AddnewCompany
  ]
})
export class AddnewCompanyModule {}
