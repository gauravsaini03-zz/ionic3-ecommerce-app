import { Component } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

	language:any;
	constructor(
		public popoverCtrl: PopoverController,
		public translate: TranslateService,
		public events: Events) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  setLanguage(lang:any) {
  	this.translate.use(lang);
  }
}
