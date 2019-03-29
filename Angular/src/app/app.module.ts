// Alle
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsVegetalComponent } from './products/fireplaces/productsVegetal.component';
import { ProductsSmokersComponent } from './products/smokers/productsSmokers.component';
import { ProductsGrillsComponent } from './products/grills/productsGrills.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OverviewComponent } from './overview/overview.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsContentComponent } from './products/productsContent.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptor } from './auth/auth.interceptor';
import { NgbdModalComponent, NgbdModalContentComponent } from './modal/modal-component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AddedToCartModalComponent } from './added-to-cart-modal/added-to-cart-modal.component';

// import { HttpXsrfInterceptor } from './csrf/csrf.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsVegetalComponent,
    ProductsSmokersComponent,
    ProductsGrillsComponent,
    NavbarComponent,
    NotFoundComponent,
    AboutUsComponent,
    OverviewComponent,
    ShoppingCartComponent,
    ImpressumComponent,
    PrivacyPolicyComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    NgbdModalComponent,
    NgbdModalContentComponent,
    FooterComponent,
    ProductDetailComponent,
    AddedToCartModalComponent,
    ProductsContentComponent
  ],
  entryComponents: [NgbdModalContentComponent],
  imports: [
    BrowserModule,
    StorageServiceModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    // HttpClientXsrfModule,
    RouterModule.forRoot([
      { path: '', component: OverviewComponent},
      { path: 'about-us', component: AboutUsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { path: 'impressum', component: ImpressumComponent},
      { path: 'privacy-policy', component: PrivacyPolicyComponent},
      { path: 'user', component: UserComponent},
      { path: 'login', component: SignInComponent},
      { path: 'userProfile', component: UserProfileComponent },
      { path: 'modal', component: NgbdModalComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/fireplaces', component: ProductsVegetalComponent },
      { path: 'products/smokers', component: ProductsSmokersComponent },
      { path: 'products/grills', component: ProductsGrillsComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  providers: [
    /* { provide: HTTP_INTERCEPTORS,
        useClass: HttpXsrfInterceptor,
        multi: true},*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
