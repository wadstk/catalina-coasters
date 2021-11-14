import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService} from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  endsubs$ : Subject<any> = new Subject();
  totalPrice : number;
  isCheckout = false;
  constructor(private cartService: CartService, 
              private ordersService: OrdersService, 
              private router: Router) { 

                this.router.url.includes('checkout') ? this.isCheckout=true : this.isCheckout = false;

  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy() {
    this.endsubs$.next()
    this.endsubs$.complete();
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);

  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((reqCart) => {
      this.totalPrice = 0;
      if(reqCart) {
        reqCart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

}
