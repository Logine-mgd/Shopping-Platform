import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`${this.baseUrl}/brands`);
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/brands/${id}`);
  }
}
