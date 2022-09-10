import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient,
    private localStorageToken: LocalStorageService,
    private router: Router
  ) { }

  login(email: string, password: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURLUsers}/login`, {email: email, password: password})
  }

  userLogin(email: string, password: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURLUsers}/user-login`, {email: email, password: password})
  }

  logout() {
    this.localStorageToken.deleteToken();
    this.router.navigate(['/login']);
  }

  userLogout() {
    this.localStorageToken.deleteToken();
    this.router.navigate(['/user-login']);
  }
  
}
