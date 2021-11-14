import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { Subject } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endsub$ : Subject<any> = new Subject();
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts() 
  }

  ngOnDestroy(): void {
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getFeaturedProducts() {
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endsub$)).subscribe((products) => {
      this.featuredProducts = products;
    });
  }

}
