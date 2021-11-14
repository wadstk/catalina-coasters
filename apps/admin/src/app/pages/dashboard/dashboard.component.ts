import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@catalina-coasters/orders';
import { ProductsService } from '@catalina-coasters/products';
import { UsersService } from '@catalina-coasters/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  numOrders: number;
  numUsers: number;
  numProducts: number;
  numSales: number;
  endsub$: Subject<any> = new Subject();

  constructor(private orderService: OrdersService,
              private productService: ProductsService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this._getNumOrders();
    this._getTotalSales();
    this._getNumProducts();
    this._getNumUsers();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _getNumOrders() {
    this.orderService.getNumOrders().pipe(takeUntil(this.endsub$))
    .subscribe((num) => {
      this.numOrders = num;
    });
  }

  private _getTotalSales() {
    this.orderService.getTotalSales().pipe(takeUntil(this.endsub$))
    .subscribe((num) => {
      this.numSales = num;
    });
  } 

  private _getNumProducts() {
    this.productService.getNumProducts().pipe(takeUntil(this.endsub$))
    .subscribe((num) => {
      this.numProducts = num;
    });
  }

  private _getNumUsers() {
    this.usersService.getNumUsers().pipe(takeUntil(this.endsub$))
    .subscribe((num) => {
      this.numUsers = num;
    });
  }
}
