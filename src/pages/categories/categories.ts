import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ShowcartPage } from '../showcart/showcart';
import { SearchPage } from '../search/search';
import { ProductsPage } from '../products/products';
import { DataService } from '../../providers/data-service';

@Component({
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public categoryList: Array<any>;

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public data: DataService) {
    
    this.data.getCategories().subscribe((data) => {
      for (var i = 0; i < data.categories.length; ++i) {
        let p_id = data.categories[i].parent_id;
        for (var j = 0; j < data.parent_categories.length; ++j) {
          if(data.parent_categories[j].id == p_id)
          {
            data.parent_categories[j].child.push(data.categories[i])
          }  
        }
      }
      this.categoryList = data.parent_categories;
    }, (error) => {
      console.error(error);
    });
  }

  goToCart() {
    this.navCtrl.push(ShowcartPage);
  }

  goToProducts(id:String) {
    // go to the ProductsPage
    // and pass in the category id
    this.navCtrl.push(ProductsPage, id);
  }

  search() {
  	this.navCtrl.push(SearchPage);
  }
}
