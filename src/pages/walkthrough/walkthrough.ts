import { Component } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html'
})

export class WalkThroughPage {
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  startApp() {
    this.navCtrl.setRoot(HomePage).then(() => {
      this.storage.set('hasSeenWalkThrough', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the walkthrough page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the walkthrough page
    this.menu.enable(true);
  }

}
