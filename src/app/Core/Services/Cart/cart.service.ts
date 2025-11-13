import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    _httpClient=inject(HttpClient);
    baseurl= environment.baseURL;
    token:string = JSON.stringify(localStorage.getItem("loginusertoken"));
    constructor() { }
    add2cart(productId: string): Observable<any> {
    return this._httpClient.post(`${this.baseurl}/cart`, { productId },
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
    }
    updatecartproductQuantity(productId: string, quantity: string): Observable<any> {
      return this._httpClient.put(`${this.baseurl}/cart/${productId}`, { count: quantity },
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
    }
    getloggeduserCart(): Observable<any>
    {return this._httpClient.get(`${this.baseurl}/cart`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    
    removeCartItem(id:string): Observable<any>
    {return this._httpClient.delete(`${this.baseurl}/cart/${id}`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    clearUserCart(): Observable<any>
    {return this._httpClient.delete(`${this.baseurl}/cart`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    
}
