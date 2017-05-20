import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Companies } from '../../providers/github-users/github-users';
import { UserDetailsPage } from '../user-details/user-details';
import { AddnewCompany } from '../repos/addnewcompany';

import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/throttleTime';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  companies: any = [];
  usersError: boolean = false;
  userLoader: any;
  originalcompanies: any = [];
  companyFilter: any = ''
  constructor(public navCtrl: NavController,
    private Companies: Companies,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

  }
  loadUsers() {
    this.presentLoading();
    this.Companies.getCompanies().subscribe(companies => {
      this.companies = []
      for (let company of companies) {
        // console.log(company)
        
        if (company.companyName && company.companyName.length) {

          this.companies.push(company)
        }
      }
      this.originalcompanies = this.companies;
      this.usersError = false
      this.userLoader.dismiss();

    },
      error => {
        this.usersError = true
      }

    )}


  ionViewDidLoad() {
    this.loadUsers();
    this.getNotifyCompniesChanged();
    console.log('Hello Users Page');
  }
  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, { login });
  }
  deleteCompany(companyName) {
    this.Companies.deleteCompany(companyName).subscribe(company => {
      this.loadUsers();
    },
      error => {
        this.usersError = true
      }

    )}


  search(searchEvent) {
    this.companyFilter = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (this.companyFilter.trim() === '' || this.companyFilter.trim().length < 3) {
      // Load cached users
      this.companies = this.originalcompanies;
    } else {
      // Get the searched users from github
      // this.Companies.searchUsers(term).subscribe(users => {
        // this.companies = users
      //   // loading.dismiss();
      // });
    }
  }

  presentLoading() {
    this.userLoader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 10000
    });
    this.userLoader.present();
    this.userLoader.onDidDismiss(() => {
      if (!this.companies) {
        this.usersError = true

      }
    });
  }

  showConfirm(companyName) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this company?',
      message: 'Do you agree to delete this company?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteCompany(companyName);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  AddCompany(){
    console.log('AddCompany')
    this.navCtrl.push(AddnewCompany);

  }

  getNotifyCompniesChanged() {
        this.Companies.PushedCompany.subscribe(
            data => {
                this.loadUsers();
            },
            error => {
                this.usersError = true
            }
        );

    }


}
