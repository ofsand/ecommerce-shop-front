import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService, MyServ } from '@ecommerce-brands/users';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eshop-user-icon',
  templateUrl: './user-icon.component.html',
  styles: [
  ]
})
export class UserIconComponent implements OnInit, OnDestroy {

  isAuth : boolean;
  items: MenuItem[];
  private subscriptionName: Subscription;

  constructor(
    private authService: AuthService,
    private localStorageToken: LocalStorageService,
    private router: Router,
    private serv: MyServ
  ) {
    this.subscriptionName = this.serv.getUpdate().subscribe(msg => {
      if(JSON.stringify(msg).includes('true')) {
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    })
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
}

  ngOnInit(): void {
    this.subscriptionName = this.serv.getUpdate().subscribe(msg => {
      //this.isAuth = 
      if(JSON.stringify(msg).includes('true')) {
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    })
    

        this.items = [
            {
              label:'',
              icon:'pi pi-fw pi-user',
              items: this.isAuth? [
                    {
                      label: 'Logout',
                      icon: 'pi pi-sign-out',
                      command: () => {this.logoutUser(); },
                    }
                  ] : [
                {
                  label: 'I am Admin',
                  icon: 'pi pi-fw pi-user',
                },
                {
                  label: 'I am a customer',
                  icon: 'pi pi-fw pi-users',
                  command: () => {this._goToUserLogin(); },
              }
              ]
          }];
  }


  logoutUser() {
    this.authService.userLogout();
    this.isAuth = this.isAuthenticated();
    this.ngOnInit();
    console.log('Logged out');
  }

  private _goToUserLogin() {
    this.router.navigate(['/user-login']);
    this.isAuth = this.isAuthenticated();
    this.ngOnInit();
  }
  
  isAuthenticated(): boolean {
    const token = this.localStorageToken.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
      console.log(tokenDecode);
        if( !this._tokenExpired(tokenDecode.exp)) {
          return true;
        } else {
          return false;
        }
      } 
    return false;
  }

  /*
  private _loginLogoutIcon() {
    
    //Simplest way to Decode the token // There are more complicated ways !
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));

     if( !this._tokenExpired(tokenDecode.exp)) {
      this.isAuth = true;
      console.log('Logged in');
      }else {
        this.isAuth = false;
        console.log('Logged out');
      }
      
      
    }
    this.router.navigate(['/user-login']);
  }
*/

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
