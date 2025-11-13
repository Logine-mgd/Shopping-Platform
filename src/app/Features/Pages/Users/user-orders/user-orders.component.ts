import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Core/Services/Order/order.service';
import { UpdateauthenticationService } from '../../../../Core/Services/Authentication/updateauthentication.service';
import { Order } from '../../../../Shared/Interfaces/Orders/order';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {
  userOrders: Order[] = [];
  userId!: string;
  private _OrderService = inject(OrderService);
  private _UpdateauthenticationService = inject(UpdateauthenticationService);
  constructor() {}

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken(): void {
    this._UpdateauthenticationService.verifyToken().subscribe({
      next: (res) => {
        console.log('user decoded', res.decoded.id);
        this.userId = res.decoded.id;
        this.getUserOrders();
      },
      error: (err) => console.log(err),
    });
  }

  getUserOrders(): void {
    this._OrderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        console.log('user orders', res);
        this.userOrders = res;
      },
      error: (err) => console.log(err),
    });
  }
}
