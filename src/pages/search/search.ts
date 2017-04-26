import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'search.html',
})
export class SearchPage {
	
	queryText = '';

  constructor(private navCtrl: NavController) {

  }

  updateSchedule() {
  	console.log(this.queryText);
  }
}
