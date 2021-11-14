import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@catalina-coasters/orders'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsub$: Subject<any> = new Subject();

  constructor(private ordersService: OrdersService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endsub$))
    .subscribe((orders) => {
      this.orders = orders;
    });

  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
  
  deleteOrder(orderId : string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).pipe(takeUntil(this.endsub$))
        .subscribe(() => {
          this._getOrders();
          this.messageService.add({
            severity:'success', 
            summary:'Service Message', 
            detail:'Order is deleted'});
          }, 
          () => {
            this.messageService.add({
            severity:'error', 
            summary:'Service Message', 
            detail:'Order is NOT deleted'});
      
          });
      },
      reject: () => {return;}
    });
  }

}
