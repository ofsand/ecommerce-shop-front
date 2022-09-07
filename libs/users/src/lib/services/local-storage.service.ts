import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem('token', data);
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}
