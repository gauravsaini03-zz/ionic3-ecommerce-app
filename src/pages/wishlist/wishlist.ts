import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ShowcartPage } from '../showcart/showcart';
import { PopoverPage } from '../popover/popover';

interface Product {
  name: string;
  image: string;
  rating: number;
  price: number;
}

@Component({
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  products: Product[];

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController) {

    this.products = [{
          name: '9ct Silver Clips',
          image: 'assets/img/products/clips.jpg',
          rating: 4.5,
          price: 12
        },{
          name: 'Alphabet Charms',
          image: 'assets/img/products/alphabet.png',
          rating: 4.8,
          price: 24
        },{
          name: 'Christmas Charms',
          image: 'assets/img/products/christmas.webp',
          rating: 3.9,
          price: 25
        }];
 
    // for(let i = 0; i < 3; i++){
   
    //     let item = {
    //       name: '9ct Dimond Neclace',
    //       image: 'img/products/clips.jpg',
    //       rating: 4.0,
    //       price: 520
    //     };
   
    //     this.products.push(item);
    // }
  }
  
  goToCart() {
    this.navCtrl.push(ShowcartPage);
  }

  presentPopover(myEvent: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
