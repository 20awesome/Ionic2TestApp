import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// pages
import { UsersPage } from '../pages/users/users';
import { AddnewCompany } from '../pages/repos/addnewcompany';
import { UserDetailsPage } from '../pages/user-details/user-details';

// services
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Companies } from '../providers/github-users/github-users';
import { HttpModule } from '@angular/http';

// pipes
import { CompaniesNameAndGoodsFilter } from "../pipes/companies.pipe"


// 3d modules
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    AddnewCompany,
    UserDetailsPage,
    CompaniesNameAndGoodsFilter
  ],
  imports: [
    IonTagsInputModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsersPage,
    AddnewCompany,
    UserDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Companies
  ]
})
export class AppModule { }
