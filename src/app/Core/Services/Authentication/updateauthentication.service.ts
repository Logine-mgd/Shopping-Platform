import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../Features/Interfaces/User/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateauthenticationService {

    baseurl = environment.baseURL;
    _httpClient = inject(HttpClient);
    token:string = JSON.stringify(localStorage.getItem("loginusertoken"));
    constructor() { }
    forgotPassword(id:string): Observable<any>
    {return this._httpClient.post(`${this.baseurl}/auth/forgotPasswords`,id)}
    verifyResetCode(id:string): Observable<any>
    {return this._httpClient.post(`${this.baseurl}/auth/verifyResetCode`,id)}
    resetPassword(id:string): Observable<any>
    {return this._httpClient.put(`${this.baseurl}/auth/resetPassword`,id)}
    updateUser(us:User): Observable<any>
    {return this._httpClient.put(`${this.baseurl}/users/updateMe`,us,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      }
    )}
    getAllUsers(): Observable<any>
    {return this._httpClient.get(`${this.baseurl}/users`)}
    verifyToken(): Observable<any>
    {return this._httpClient.get(`${this.baseurl}/auth/verifyToken`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
    }
    //
}
