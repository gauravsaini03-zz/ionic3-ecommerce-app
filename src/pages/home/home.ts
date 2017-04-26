import { Component, ViewChild } from '@angular/core';

import { NavController, MenuController, Slides,Platform } from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { ShowcartPage } from '../showcart/showcart';
import { SearchPage } from '../search/search';

import { UserService } from '../../providers/user-service';
import { DataService } from '../../providers/data-service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {

  // products: Product;
  @ViewChild('adSlider') slider: Slides;

  products: Array<any>;
  banners: String[];

  constructor(
    public userService: UserService,
    public navCtrl: NavController, 
    public menu: MenuController,
    public data: DataService,
    public platform: Platform,
    private ga: GoogleAnalytics) {

    this.platform.ready().then(() => {
      this.ga.trackView("Home Page");
    });

    console.log(userService.userData)

    this.banners = [
      'assets/img/banner-1.webp',
      'assets/img/banner-2.webp',
      'assets/img/banner-3.webp'
    ]

    this.data.getPopularProducts().subscribe((popular) => {
      this.products = popular;
      console.log(this.products)
    }, (error) => {
      console.error(error);
    });
    
  }

  // arrayToMatrix(list, lengthSubArray) {
  //   let matrix = [], i, k;
    
  //   for (i = 0, k = -1; i < list.length; i++) {
  //     if (i % lengthSubArray === 0) {
  //         k++;
  //         matrix[k] = [];
  //     }
  //     matrix[k].push(list[i]);
  //   }

  //   return matrix;
  // }

  trackEvent() {
    let active = this.slider.getActiveIndex();
    this.platform.ready().then(() => {
      this.ga.trackEvent("Slider", "Slider-Changed", "Label", active);
    });
  }

  goToProducts(productData:Object) {
    // go to the product detail page
    // and pass in the product data
    // this.navCtrl.push(ProductsPage, sessionData);
    this.navCtrl.push(ProductsPage, productData);
  }

  goToCart() {
    this.navCtrl.push(ShowcartPage).catch(()=> console.log('should I stay or should I go now'));
  }

  search() {
    this.navCtrl.push(SearchPage);
  }

}
