import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { APP_ID } from './constants';

import { Auth, Push } from '@ionic/cloud-angular';

@Injectable()
export class UserService {
  USER_DATA = "ionic_user_" + APP_ID;
  AUTH_KEY = "ionic_auth_" + APP_ID;
  
  userData: any;
  db: any;
  is_authenticated: boolean;

  constructor(
    public events: Events,
    public storage: Storage,
    public auth: Auth,
    public push: Push
  ) {

    var self = this;

    let data = self.getUserData();
    self.userData = JSON.parse(data);

    if(!self.userData || self.userData == '' || !self.userData.id ){
      self.is_authenticated = false;
    }
    else{
      self.is_authenticated = true;
    }

  }

  getUserData() {
    return localStorage.getItem(this.USER_DATA);
  }

  isAuthenticated() {
    // We can also call use this.auth.isAuthenticated()
    // But to save server calls we have managed it locally
    var self = this;
    return new Promise((resolve) => {
      resolve(self.is_authenticated);
    })
  }

  logout() {
    this.auth.logout();
    this.push.unregister();
    this.events.publish('user:logout');
    return true;
  }
}
