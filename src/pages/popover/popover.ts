import { Component } from '@angular/core';
import { ViewController, NavController, App, ModalController } from 'ionic-angular';

import { SupportPage } from '../support/support';
import { SettingsPage } from '../settings/settings';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="goToPage('SettingsPage')">Settings</button>
      <button ion-item (click)="goToPage('SupportPage')">Support</button>
      <button ion-item (click)="close('http://ionicframework.com/docs/v2/getting-started')">Learn Ionic</button>
    </ion-list>
  `
})
export class PopoverPage {

  classes: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { 

    this.classes  = {
      'SettingsPage': SettingsPage,
      'SupportPage': SupportPage
    }

  }

  goToPage(page:any) {
    // Navigting from Overlay Components
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // If you simply push it will freeze the UI
    this.viewCtrl.dismiss();
    this.app.getRootNav().push(this.classes[page]);
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}