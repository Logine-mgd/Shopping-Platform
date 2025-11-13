import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  _httpClient=inject(HttpClient);
  baseurl=environment.baseURL;
  token:string = JSON.stringify(localStorage.getItem("loginusertoken"));

    constructor(){}
    add2WishList(productId:string): Observable<any>
    {return this._httpClient.post(`${this.baseurl}/wishlist`,{productId},
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    getloggedWishList(): Observable<any>
    {return this._httpClient.get(`${this.baseurl}/wishlist`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    removeWishListItem(id:string): Observable<any>
    {return this._httpClient.delete(`${this.baseurl}/wishlist/${id}`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      })}
    
}
