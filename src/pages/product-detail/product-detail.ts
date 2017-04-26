import { Component } from '@angular/core';
import { NavController, PopoverController, ToastController, NavParams } from 'ionic-angular';
import { ShowcartPage } from '../showcart/showcart';
import { PopoverPage } from '../popover/popover';
import { SearchPage } from '../search/search';
import { CheckoutPage } from '../checkout/checkout';

@Component({
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productId: number;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public toastCtrl: ToastController,
    public _params:NavParams) {

    this.productId = _params.get('productId');
  }

  goToCart() {
    this.navCtrl.push(ShowcartPage);
  }
  
  addToCart() {
    this.presentToast();
    this.navCtrl.push(ShowcartPage);
  }

  buyNow() {
    this.navCtrl.push(CheckoutPage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Added to cart successfully',
      duration: 1500
    });
    toast.present();
  }

  presentPopover(myEvent: Event) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  search() {
    this.navCtrl.push(SearchPage);
  }

}
