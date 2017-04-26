import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, AlertController } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductsFilterPage } from '../products-filter/products-filter';
import { ShowcartPage } from '../showcart/showcart';
import { PopoverPage } from '../popover/popover';
import { SearchPage } from '../search/search';

interface Product {
  name: string;
  image: string;
  rating: number;
  price: number;
}

@Component({
  templateUrl: 'products.html',
})

export class ProductsPage {
	
	products: Product[];

	constructor(
		public navCtrl: NavController, 
		public popoverCtrl: PopoverController, 
		public modalCtrl: ModalController,
		public alertCtrl: AlertController
	) {


    this.products = [];
 
    for(let i = 0; i < 2000; i++){
   
        let item = {
          name: 'Enamel Butterfly Charm',
          image: 'assets/img/products/clips.jpg',
          rating: 4.0,
          price: 520
        };
   
        this.products.push(item);
    }
    
	}

  goToCart() {
    this.navCtrl.push(ShowcartPage);
  }

  presentPopover(myEvent:Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  search() {
    this.navCtrl.push(SearchPage);
  }

	goToProductDetail(data:any) {
    console.log(data);
		this.navCtrl.push(ProductDetailPage);
	}

  presentFilter() {
    let modal = this.modalCtrl.create(ProductsFilterPage);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        // play with data here
      }
    });
  }

  sortBy() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort Options');

    alert.addInput({
      type: 'radio',
      label: 'Relevance',
      value: 'relevance',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Popularity',
      value: 'popular'
    });
    alert.addInput({
      type: 'radio',
      label: 'Low to High',
      value: 'lth'
    });
    alert.addInput({
      type: 'radio',
      label: 'High to Low',
      value: 'htl'
    });
    alert.addInput({
      type: 'radio',
      label: 'Newest First',
      value: 'newest'
    });

    alert.addButton('Cancel');

    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
      	console.log(data);

        let navTransition = alert.dismiss();

        // start some async method
        setTimeout(() => {
          navTransition.then(() => {
            this.navCtrl.push(ShowcartPage);
          });
        }, 3000);
        
        // return false;
      }
    });

    alert.present().then(() => {
      console.log("=====alert---present");
    });
  }

}
