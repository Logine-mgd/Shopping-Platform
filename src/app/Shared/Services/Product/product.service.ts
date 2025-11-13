import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _HttpClient = inject(HttpClient);
  baseurl=environment.baseURL;
  constructor() { }

    getAllProducts():Observable<any>
    {return this._HttpClient.get(`${this.baseurl}/products`)}
    getProductById(id:string):Observable<any>
    {return this._HttpClient.get(`${this.baseurl}/products/${id}`)}
    
}
