import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../providers/user-service';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signup: {name?: string, email?: string, password?: string} = {};

  details: UserDetails = {
    "name": this.signup.name, 
    "email": this.signup.email, 
    "password": this.signup.password
  };

  submitted = false;

  constructor(
    public navCtrl: NavController, 
    public userService: UserService,
    public user: User,
    public auth: Auth) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log(this.signup)
      this.auth.signup(this.signup).then(() => {
        // user is now registered
        // we can now use this.user to update further data if required
        this.navCtrl.push(LoginPage);
      }, (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });
    }
  }

  forgetPassword() {
    
  }
}
