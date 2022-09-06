import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, {email, password})
  }
}
