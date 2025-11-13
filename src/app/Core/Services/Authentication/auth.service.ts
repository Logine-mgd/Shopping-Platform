import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Signinfo } from '../../Interfaces/Auth/signinfo';
import { Logininfo } from '../../Interfaces/Auth/logininfo';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  _httpClient = inject(HttpClient);
  private baseUrl = environment.baseURL;
  private _PLATFORM_ID = inject(PLATFORM_ID);
  public user = new BehaviorSubject<any>(null);

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID))
    {this.isLoggedInUser();}
  }

  signup(data: Signinfo):Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }

  login(data: Logininfo) :Observable<any>
  {
    console.log(data);
    return this._httpClient.post(`${this.baseUrl}/auth/signin`, data);
  }
  
  saveLoggedInUser() {
    const token = localStorage.getItem('loginusertoken');
    if (token) {
      this.user.next(jwtDecode(localStorage.getItem('loginusertoken')!));
    }
  }

  isLoggedInUser() {
    const token = localStorage.getItem('loginusertoken');
    if (token) {
      this.user.next(jwtDecode(localStorage.getItem('loginusertoken')!));
    }
  }

  logout() {
    localStorage.removeItem('loginusertoken');
    this.user.next(null);
  }
}


