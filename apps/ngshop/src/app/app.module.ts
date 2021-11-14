import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component'; 

import {ProductsModule} from '@catalina-coasters/products'
import {UiModule} from '@catalina-coasters/ui'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {OrdersModule} from  '@catalina-coasters/orders';
import { MessageServiceComponent } from './shared/message-service/message-service.component';
import {ToastModule} from 'primeng/toast';
import { JwtInterceptor, UsersModule } from '@catalina-coasters/users';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NgxStripeModule} from 'ngx-stripe';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
    HeaderComponent, 
    FooterComponent, 
    NavComponent, MessageServiceComponent
  ],
  imports: [    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]), 
    NgxStripeModule.forRoot('pk_test_51JulQCG6LpRfkO9S32CxcSHwDhiyXFaZ44oqQtXxi4Ad39bJRwL7JXHjjlZ0PZ04JyCZgMMDvwr20cX41D50CC1b008DyEQfQv'),
    ProductsModule,
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
    OrdersModule,
    ToastModule,
    UsersModule
            
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
    MessageServiceComponent
  ],
})
export class AppModule {}
