import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Companies } from '../../providers/github-users/github-users';
import { UserDetailsPage } from '../user-details/user-details';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'addnewcompany',
  templateUrl: 'addnewcompany.html'
})
export class AddnewCompany {
  tags: any = [];
  companyName: any = '';
  usersError: boolean = false;

  constructor(public navCtrl: NavController, private Companies: Companies, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('Hello AddnewCompany Page');
  }
  logForm() {



    this.Companies.addCompany(this.companyName, this.tags).subscribe(company => {
      let login = company.companyName
      this.notifyProfileChange();
      this.navCtrl.pop();
      this.navCtrl.push(UserDetailsPage, { login });
    },
      error => {
        console.log(error,'error')
        this.usersError = true
        this.showAlert(error);
      }

    )}
  canActivate() {
    if (this.companyName && this.companyName.length >= 3) {
      return true
    } else {
      return false
    }
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
