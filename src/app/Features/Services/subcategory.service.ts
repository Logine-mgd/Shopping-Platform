import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {


  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAllSubCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/subcategories`);
  }

  getSubcategoryById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/subcategories/${id}`);
  }

  getSubCategoriesOnCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}/subcategories`);
  }
}
