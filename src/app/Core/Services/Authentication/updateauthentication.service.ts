import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../Features/Interfaces/User/user';
import { Resetpass } from '../../../Shared/Interfaces/resetpass';

@Injectable({
  providedIn: 'root'
})
export class UpdateauthenticationService {

    baseurl = environment.baseURL;
    _httpClient = inject(HttpClient);
    token !:string;
    constructor() { }
    forgotPassword(id:string): Observable<any>
    {return this._httpClient.post(`${this.baseurl}/auth/forgotPasswords`,id)}
    verifyResetCode(id:string): Observable<any>
    {return this._httpClient.post(`${this.baseurl}/auth/verifyResetCode`,id)}
    resetPassword(resetps:Resetpass): Observable<any>
    {return this._httpClient.put(`${this.baseurl}/auth/resetPassword`,resetps)}
    updateUser(us:User): Observable<any>
    {
      this.token = JSON.stringify(localStorage.getItem("loginusertoken"));
      return this._httpClient.put(`${this.baseurl}/users/updateMe`,us,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      }
    )}
    getAllUsers(): Observable<any>
    {return this._httpClient.get(`${this.baseurl}/users`)}
    verifyToken(): Observable<any>
    {
      this.token = JSON.stringify(localStorage.getItem("loginusertoken"));
      return this._httpClient.get(`${this.baseurl}/auth/verifyToken`,
      {
        headers:{
          token:JSON.parse(this.token)
        }
      });
    }
    //
}
