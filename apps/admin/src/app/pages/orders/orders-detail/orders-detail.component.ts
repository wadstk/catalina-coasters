import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@catalina-coasters/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatusArr =[];
  selectedStatus: any;
  endsub$: Subject<any> = new Subject();

  constructor(private orderService: OrdersService,
              private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatusArr = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService
        .getOrder(params.id)
        .pipe(takeUntil(this.endsub$))
        .subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.orderService.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endsub$))
    .subscribe(() => {
      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Order is updated'
      }); 
    }, () => {
      this.messageService.add({
        severity:'error', 
        summary:'Service Message', 
        detail:'Order is not updated'
      }); 
    });
  }
}
