import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(useId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${useId}`)
  }

  deleteUser(userId: string) :Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

  updateUser(userData: User, userId: string):Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, userData);
  }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}`, userData);
  }

}
