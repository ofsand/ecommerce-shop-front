import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrlOrders = environment.apiUrl + 'orders'

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrlOrders}`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`)
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus)
  }
}


/*


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

*/