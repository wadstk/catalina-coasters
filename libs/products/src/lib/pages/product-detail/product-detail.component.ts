import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, CartItem } from '@catalina-coasters/orders';


@Component({
  selector: 'products-product-page',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product!: Product;
  endsub$: Subject<any> = new Subject();
  quantity = 1;
  constructor(private prodService: ProductsService, 
              private route: ActivatedRoute, 
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productid) {
        this._getProduct(params.productid);
      }

    });
  }

  ngOnDestroy(): void {
    this.endsub$.next();
    this.endsub$.complete();
  }

  addProductToCart() {
    const cartItem : CartItem = {
      productId : this.product.id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);

  }

  private _getProduct(id: string) {
    this.prodService.getProduct(id).pipe(takeUntil(this.endsub$)).subscribe(prod => {
      this.product=prod;


    });
  }

}
