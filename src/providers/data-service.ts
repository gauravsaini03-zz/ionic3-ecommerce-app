import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Database } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class DataService {

  cartItems: any[];
  loading: any;

  constructor(
    public storage: Storage, 
    public db: Database) {
    this.storage.get('cart').then((value) => {
      if (value === null) {
        this.cartItems = [];
      } else {
        this.cartItems = value;
      }
    });
    this.db.connect();
  }

  public getCategories(): Observable<any> {
    const categories:any = this.db.aggregate({
      name: "testing",
      categories: this.db.collection('categories'),
      parent_categories: this.db.collection('parent_categories')
    })
    return categories.fetch();
  }

  public getPopularProducts(): Observable<any> {
    const popular_products:any = this.db.collection('popular_products');
    return popular_products.order("price", "ascending").watch();
  }

  public getProducts(): Observable<any> {
    const products:any = this.db.collection('products');
    return products.fetch();
  }

  public addToCart(item: any): Promise<any> {
    this.cartItems.push(item);
    return this.storage.set('cart', this.cartItems);
  }

  public clearCart(): Promise<any> {
    this.cartItems = [];
    return this.storage.remove('cart');
  }

  public getCart(): Promise<any> {
    return this.storage.get('cart');
  }

}