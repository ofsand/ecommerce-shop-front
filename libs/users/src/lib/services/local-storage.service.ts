import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN);
  }

}
