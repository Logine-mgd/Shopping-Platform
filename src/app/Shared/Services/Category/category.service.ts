import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _http = inject(HttpClient);
  private baseurl = environment.baseURL;

  constructor() {}

  getAllCategories():Observable<any>
   {
    return this._http.get(`${this.baseurl}/categories`);
  }

  getCategoryById(id: string):Observable<any>
  {
    return this._http.get(`${this.baseurl}/categories/${id}`);
  }
}
