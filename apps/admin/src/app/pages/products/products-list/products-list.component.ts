import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@catalina-coasters/products';
import { Product } from '@catalina-coasters/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products:Product[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private productService : ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.endsub$))
    .subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }
  
  deleteProduct(productId : string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).pipe(takeUntil(this.endsub$))
        .subscribe(() => {
          this._getProducts();
          this.messageService.add({
            severity:'success', 
            summary:'Service Message', 
            detail:'Category is deleted'});
          }, 
          () => {
            this.messageService.add({
            severity:'error', 
            summary:'Service Message', 
            detail:'Category is NOT deleted'});
      
          });
      },
      reject: () => {return;}
    });
  }
}
