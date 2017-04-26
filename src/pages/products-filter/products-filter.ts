import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-products-filter',
  templateUrl: 'products-filter.html'
})
export class ProductsFilterPage {
  filters: Array<any> = [];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

    this.filters = [
      { 
        "name":"Free Shiping",
        "isChecked":false
      },
      { 
        "name":"Fulfilled by vPlanet",
        "isChecked":true
      },
      { 
        "name":"In Stock",
        "isChecked":true
      }
    ];
    
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.filters.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    this.dismiss();
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
