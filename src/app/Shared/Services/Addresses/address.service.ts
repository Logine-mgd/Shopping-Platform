import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { UserAddress } from '../../../Features/Interfaces/User/user-address';

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  private baseUrl = environment.baseURL;
  user = new BehaviorSubject<any>(null);
  _HttpClient = inject(HttpClient);
  token:string = JSON.stringify(localStorage.getItem("loginusertoken"));
  constructor() {}

  addAddress(address: UserAddress): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/addresses`, address,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
  }

  removeAddress(id: string): Observable<any> {
    return this._HttpClient.delete<void>(`${this.baseUrl}/addresses/${id}`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
  }

  getAddressById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/addresses/${id}`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
  }

  getAllUserAddresses(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/addresses`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
  }
}

