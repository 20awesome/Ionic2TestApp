import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Companies } from '../../providers/github-users/github-users';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  companyName: string;
  company: any;
  userLoader: any;
  usersError: boolean = false;

  tags: any = []


  constructor(public navCtrl: NavController, private navParams: NavParams,
    private Companies: Companies, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.companyName = navParams.get('login');
    this.loadUser();
  }

  ionViewDidLoad() {
    console.log('Hello UserDetails Page');
  }

  loadUser() {
    // this.presentLoading();
    this.Companies.getCompanyByName(this.companyName).subscribe(company => {
      this.company = company
      this.tags = this.company.companyGoods
      this.usersError = false
      // this.userLoader.dismiss();

    },
      error => {
        this.usersError = true
      }

    )
  }

  // presentLoading() {
  //   this.userLoader = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     duration: 10000
  //   });
  //   this.userLoader.present();
  //   this.userLoader.onDidDismiss(() => {
  //     if (!this.company) {
  //       this.usersError = true

  //     }
  //   });
  // }

  onChange(val) {
    this.Companies.changeCompany(this.companyName, this.tags).subscribe(company => {
      this.usersError = false
      // this.notifyProfileChange();
    },
      error => {
        this.showAlert(error)
        this.usersError = true
      }
    )
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
  deleteCompany(companyName) {
    this.Companies.deleteCompany(companyName).subscribe(company => {
      this.notifyProfileChange();
      // this.navCtrl.pop();
      this.navCtrl.popToRoot();
    },
      error => {
        this.usersError = true
      }

    )
  }
  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  notifyProfileChange() {
    this.Companies.PushedCompanyData('profileChange')
  }

}
