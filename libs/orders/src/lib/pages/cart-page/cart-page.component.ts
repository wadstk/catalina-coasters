import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CartService} from '../../services/cart.service';
import { CartItemsDetailed} from '../../models/cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed : CartItemsDetailed[] = [];
  cartCount = 0;
  endsubs$: Subject<any> = new Subject();


  constructor(private router: Router, 
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemsDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
    
  }

  updateCartItemQuantity(event, cartItem: CartItemsDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true);
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe(respCart => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProd)=> {
          this.cartItemsDetailed.push({
            product: respProd,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }

}
