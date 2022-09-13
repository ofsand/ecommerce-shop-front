import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  apiURLReviews = environment.apiUrl + 'reviews';

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiURLReviews}`);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLReviews}/${reviewId}`);
  }

}
