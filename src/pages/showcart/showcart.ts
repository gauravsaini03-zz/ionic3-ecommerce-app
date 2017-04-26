import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
/*
  Generated class for the ShowcartPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'showcart.html',
})
export class ShowcartPage {
quantity:any;
  constructor(private navCtrl: NavController) {
  	this.quantity = 1;
  }

  goToCheckout() {
		this.navCtrl.push(CheckoutPage);
	}
}
