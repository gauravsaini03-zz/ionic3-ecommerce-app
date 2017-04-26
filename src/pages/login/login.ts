import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, LoadingController, ToastController, Events } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { Auth, IDetailedError, Push, PushToken } from '@ionic/cloud-angular';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};

  submitted = false;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public auth: Auth,
    public userService: UserService,
    public toastCtrl: ToastController,
    public events: Events,
    public push: Push) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // start Loader
      let loading = this.loadingCtrl.create({
        content: "Login wait...",
        duration: 20
      });
      loading.present();

      this.auth.login('basic', this.login).then((result) => {
        // user is now registered
        this.navCtrl.setRoot(HomePage);
        this.events.publish('user:login');
        loading.dismiss();
        this.showToast(undefined);
        // Push Notification register
        this.push.register().then((data: PushToken) => {
          return this.push.saveToken(data);
        }).then((data: PushToken) => {
          console.log('Token saved:', data.token);
        });
      }, (err: IDetailedError<string[]>) => {
        console.log(err);
        loading.dismiss();
        this.showToast(err)
      });
    }
  }

  showToast(response_message:any) {
    let toast = this.toastCtrl.create({
      message: (response_message ? response_message : "Log In Successfully"),
      duration: 1500
    });
    toast.present();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
