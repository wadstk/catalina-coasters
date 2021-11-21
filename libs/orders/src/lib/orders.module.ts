import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import {ToastModule} from 'primeng/toast';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
//import { AuthGuard } from '@catalina-coasters/users';


export const routes: Route[] = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    //canActivate: [AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
];

@NgModule({
    imports: [CommonModule, 
              RouterModule.forChild(routes), 
              BadgeModule, 
              ToastModule, 
              ButtonModule, 
              InputNumberModule,
              FormsModule,
              InputTextModule,
              InputMaskModule,
              DropdownModule,
              ReactiveFormsModule],
    providers: [],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    exports: [
      CartIconComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();

    }
}
