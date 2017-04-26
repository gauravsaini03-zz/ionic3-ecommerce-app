import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SupportPage } from '../support/support';
import { UserService } from '../../providers/user-service';

import { User } from '@ionic/cloud-angular';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  birthdate: string;
  account: string = "profile";
  base64Image: any = "http://www.gravatar.com/avatar?d=mm&s=140";

  constructor(
    public alertCtrl: AlertController, 
    public nav: NavController, 
    public user: User,
    public userService: UserService,
    public camera: Camera) {
  }

  ngAfterViewInit() {
    
  }

  updatePicture() {
    let options = {
      quality:100,   // Specify quality in number 0-100
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,   // camera or gallery
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true,
      correctOrientation:true,
      cameraDirection: 0// BACK 0, FRONT 1
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
     // Handle error
    });
    console.log('Clicked to update picture');
  }

  // Present an alert for adding date of birth
  // clicking OK will update the DOB
  // clicking Cancel will close the alert and do nothing
  addDOB() {
    let alert = this.alertCtrl.create({
      title: 'Add Date of Birth',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'birthdate',
      value: this.birthdate,
      placeholder: 'birthdate',
      type: 'date'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.user.set('birthdate', data.birthdate);
        this.user.save();
      }
    });

    alert.present();
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }

  support() {
    this.nav.push(SupportPage);
  }
}
