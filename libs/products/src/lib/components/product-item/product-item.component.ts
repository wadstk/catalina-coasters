import { Component, Input } from '@angular/core';
import { Product } from '../../models/products';
import { CartService} from '../../../../../orders/src/lib/services/cart.service';
import { CartItem } from '../../../../../orders/src/lib/models/cart';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent  {
  @Input() product!: Product;

  constructor(private cartService: CartService, private messageService: MessageService ) { }


  addProductToCart() {
    const cartItem: CartItem ={
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }

}
