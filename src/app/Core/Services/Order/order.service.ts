import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  baseurl = environment.baseURL; 
_httpClient = inject(HttpClient);
token:string = JSON.stringify(localStorage.getItem("loginusertoken"));
    
  constructor() {}

  createCashOrder(userId: string, orderData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}/orders/${userId}`, orderData,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
  }

  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}/orders`);
  }

  getUserOrders(userId: string): Observable<any> {
    return this._httpClient.get(`${this.baseurl}/orders/user/${userId}`);
  }

  CheckoutSession(orderId: string, orderData: any): Observable<any> {
    return this._httpClient.post(
      `${this.baseurl}/orders/checkout-session/${orderId}?url=http://localhost:4200`,
      orderData,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      }
    );
  }
}
