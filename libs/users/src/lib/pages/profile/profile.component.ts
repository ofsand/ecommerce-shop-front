import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._isAuthenticated();
  }

  private _isAuthenticated() {
    
    const token = this.localStorageService.getToken()

    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        if(!this._tokenExpired(tokenDecode.exp)) {
            return null
          } else {
          this.router.navigate(['/user-login']);
        }
    }else {
      this.router.navigate(['/user-login']);
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
