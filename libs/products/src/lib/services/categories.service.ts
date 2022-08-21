/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrlCategories = environment.apiUrl + 'categories';

  constructor(private http :HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrlCategories}`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }

  createCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(`${this.apiUrlCategories}`, category);
  }

  updateCategory(category: Category):Observable<Category>{
    return this.http.put<Category>(`${this.apiUrlCategories}/${category.id}`, category);
  }

  deleteCategory(categoryId: string):Observable<Object>{
    return this.http.delete<Object>(`${this.apiUrlCategories}/${categoryId}`);
  }
}

