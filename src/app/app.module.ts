import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { vPlanetApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/popover/popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { WalkThroughPage } from '../pages/walkthrough/walkthrough';
import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { ShowcartPage } from '../pages/showcart/showcart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ProductsFilterPage } from '../pages/products-filter/products-filter';
import { SupportPage } from '../pages/support/support';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { UserService } from '../providers/user-service';
import { DataService } from '../providers/data-service';
import { OrdinalPipe } from '../filters/ordinal';

// 3rd party modules
import { Ionic2RatingModule } from 'ionic2-rating';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { AppRate } from '@ionic-native/app-rate';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Push } from '@ionic-native/push';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

// Configure database priority
// export function provideStorage() {
//   return new Storage(['sqlite', 'indexeddb', 'localstorage'], { name: 'vplanet' })
// }

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'f8fec798'
  },
  'push': {
    'sender_id': '762350093850',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

// Deeplink Configuration
export const deepLinkConfig: DeepLinkConfig = {
  links: [
    { component: HomePage, name: 'Home Page', segment: '' },
    { component: CategoriesPage, name: 'Categories Page', segment: 'categories' },
    { component: ProductsPage, name: 'Categories Product Page', segment: 'categories/:categoryId' },
    { component: ProductDetailPage, name: 'Product Details Page', segment: 'products/:productId' },
    { component: WishlistPage, name: 'Wishlist Page', segment: 'wishlist' },
    { component: ShowcartPage, name: 'Showcart Page', segment: 'cart' },
    { component: SupportPage, name: 'Support Page', segment: 'feedback' },
    { component: SettingsPage, name: 'About Page', segment: 'settings' },
    { component: AboutPage, name: 'About Page', segment: 'about' },
    { component: LoginPage, name: 'Login Page', segment: 'login' },
    { component: SignupPage, name: 'Signup Page', segment: 'signup' }, 
    { component: AccountPage, name: 'Account Page', segment: 'account' }
  ]
};

@NgModule({
  declarations: [
    vPlanetApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    SignupPage,
    WalkThroughPage,
    HomePage,
    CategoriesPage,
    ProductsPage,
    ProductsFilterPage,
    ProductDetailPage,
    SearchPage,
    WishlistPage,
    ShowcartPage,
    CheckoutPage,
    SettingsPage,
    SupportPage,
    OrdinalPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(vPlanetApp, {locationStrategy: 'hash'}, deepLinkConfig),
    Ionic2RatingModule,
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpModule]
    }),
    IonicStorageModule.forRoot(),
    // IonicStorageModule.forRoot({ useFactory: provideStorage }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    vPlanetApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    SignupPage,
    WalkThroughPage,
    HomePage,
    CategoriesPage,
    ProductsPage,
    ProductsFilterPage,
    ProductDetailPage,
    SearchPage,
    WishlistPage,
    ShowcartPage,
    CheckoutPage,
    SettingsPage,
    SupportPage
  ],
  providers: [
    SplashScreen,
    Deeplinks,
    TextToSpeech,
    AppRate,
    GoogleAnalytics,
    Camera,
    CallNumber,
    SocialSharing,
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: APP_BASE_HREF, useValue: '/'},
    UserService, 
    DataService
  ]
})

export class AppModule {}
