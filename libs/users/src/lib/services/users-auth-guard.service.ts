import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAuthGuard implements CanActivate{


  constructor(
    private router: Router,
    private localStorageToken: LocalStorageService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    //Simplest way to Decode the token // There are more complicated ways !
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));

      if( !tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        return true;
      }
      
    }
    this.router.navigate(['/user-login']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
