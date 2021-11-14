import { Component, OnInit } from '@angular/core';
import { CartService } from '@catalina-coasters/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './message-service.component.html',
  styles: []
})
export class MessageServiceComponent implements OnInit {
  constructor(private cartService: CartService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });
  }
}

