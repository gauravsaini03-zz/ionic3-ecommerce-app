import { Component, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Events, MenuController, AlertController, Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Deploy } from '@ionic/cloud-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { AppRate } from '@ionic-native/app-rate';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { ShowcartPage } from '../pages/showcart/showcart';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { WalkThroughPage } from '../pages/walkthrough/walkthrough';
import { SupportPage } from '../pages/support/support';
import { UserService } from '../providers/user-service';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
  providers: [TranslateService]
})

export class vPlanetApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'home', component: HomePage, icon: 'home' },
    { title: 'categories', component: CategoriesPage, index: 1, icon: 'list' },
    { title: 'cart', component: ShowcartPage, index: 2, icon: 'cart' },
    { title: 'wishlist', component: WishlistPage, index: 3, icon: 'heart' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'account', component: AccountPage, icon: 'person' },
    { title: 'logout', component: HomePage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'login', component: LoginPage, icon: 'log-in' },
    { title: 'signup', component: SignupPage, icon: 'person-add' }
  ];

  otherPages: PageInterface[] = [
    { title: 'about', component: AboutPage, icon: 'cube' },
    { title: 'settings', component: SettingsPage, icon: 'settings' },
    { title: 'feedback', component: SupportPage, icon: 'mail-open' }
  ]
  rootPage: any;

  constructor(
    public events: Events,
    public userService: UserService,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public translate: TranslateService,
    public deploy: Deploy,
    public alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    private deeplinks: Deeplinks,
    private appRate: AppRate,
    private ga: GoogleAnalytics,
    private push: Push,
    private tts: TextToSpeech
  ) {

    // Check if the user has already seen the walkthrough
    this.storage.get('hasSeenWalkThrough').then((hasSeenWalkThrough) => {
        if (hasSeenWalkThrough) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = WalkThroughPage;
        }
        this.platformReady();
    })

    // decide which menu items should be hidden by current login status stored in local storage
    this.userService.isAuthenticated().then((isAuthenticated) => {
      this.enableMenu(isAuthenticated === true);
    });

    this.listenToLoginEvents();
    
    this.initializeTranslateServiceConfig();

    // checks if new snapshot available
    if (this.platform.is('cordova')) {
      this.deploy.check().then((snapshotAvailable: boolean) => {
        if (snapshotAvailable) {
          let alert = this.alertCtrl.create({
            title: 'Update Available !',
            message: 'Do you want to update the application now ?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Update',
                handler: () => {
                  this.deploy.download().then(() => {
                    this.deploy.extract()
                  }).then(() => { 
                     this.deploy.load()
                  });
                }
              }
            ]
          });
          alert.present();
        }
      });
    }
  }

  initializeTranslateServiceConfig() {
    // var userLang = navigator.language.split('-')[0];
    // userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';
    // this.translate.setDefaultLang(userLang);
    // this.translate.use(userLang);
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userService.logout();
      }, 1000);
    }
  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      // Convenience to route with a given nav
      this.deeplinks.route({
        '/about-us': AboutPage,
        '/categories': CategoriesPage,
        '/wishlist': WishlistPage,
        '/cart': ShowcartPage,
        '/login': LoginPage,
        '/settings': SettingsPage,
        '/categories/:categoryId':ProductsPage,
        '/products/:productId': ProductDetailPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
      
      
      if (this.platform.is('cordova')) {
         // App rate plugin
        this.appRate.preferences.customLocale = {
          title: "Rate vPlanet Commerce",
          message: "Would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
          cancelButtonLabel: "No, Thanks",
          laterButtonLabel: "Remind Me Later",
          rateButtonLabel: "Rate It Now"
        };
        this.appRate.preferences.storeAppURL = {
          android: 'market://details?id=com.vplanetcommerce.demoionicpwa'
        };
        this.appRate.promptForRating(false);

        // Initiate Push
        this.initPushNotification();
      }

      // Google Analytics
      return this.ga.startTrackerWithId("UA-92660667-1")
        .then(() => {
          console.log('Google analytics is ready now');
          return this.ga.enableUncaughtExceptionReporting(true)
        }).then((_success) => {
          console.log("startTrackerWithId success")
        }).catch((_error) => {
          console.log("enableUncaughtExceptionReporting", _error)
        })
    });
  }

  isActive(page: PageInterface) {
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

  initPushNotification() {
// to initialize push notifications

    const options: PushOptions = {
       android: {
           senderID: '12345679'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    let self = this;

    pushObject.on('notification').subscribe((data: any) => {
      
      console.log('Received a notification', data)
      self.tts.speak({text: data.message, locale: 'en-IN', rate: 0.75})
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));

      if (data.additionalData.foreground) {
        // if application open, show alert
        alert(data.message);
      }
      //if user NOT using app and push notification comes
      // for demo purpose for every push message we push to AboutPage
      // Although you can applu logic and according to API data 
      // you can push to specific page
      self.nav.push(AboutPage, {message: data.message});

      // Not working in Ionic Native 3
      // pushObject.finish(function() {
      //     console.log("processing of push data is finished");
      // }, function() {
      //     console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
      // }, data.additionalData.notId);

    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    
  }
}