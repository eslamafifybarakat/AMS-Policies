import { HttpClient } from '@angular/common/http';
import { keys } from '../../shared/TS Files/localstorage-key';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from '../auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  // apiUrl = environment.apiUrl;

  isUserLogin = new BehaviorSubject<boolean>(false);
  isLogged = new BehaviorSubject<boolean>(false);
  isLoggedSocial = new BehaviorSubject<boolean>(false);

  xdashLogged;
  data: any = userInfo;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if (window.localStorage.getItem(keys.logged)) {
      this.xdashLogged = window.localStorage.getItem(keys.logged);
    } else {
      this.xdashLogged = false;
    }
  }

  // register(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + "/register", user);
  // }

  login(email: any, password: any): any {
    this.isUserLogin.next(true);
    if (this.data.email == email && this.data.password == password) {
      this.xdashLogged = true;
      window.localStorage.setItem(keys.logged, 'true');
      window.localStorage.setItem(keys.userData, JSON.stringify(this.data));
      this.isLogged.next(true);
      return {
        status: true,
        data: this.data
      };
    }
    return {
      status: false
    };

  }
  // verificationCode(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + "/auth/verify", user);
  // }
  // forgetPassword(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + "/auth/forget-password", user);
  // }
  // verifyForgetPasswordCode(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + "/reset-password-verify", user);
  // }
  // resetPassword(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + "/password-reset", user);
  // }

  isLoggedIn(): boolean {
    return window.localStorage.getItem(keys?.userData) ? true : false;
    // return window.localStorage.getItem(keys?.token) ? true : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }


  signOut(): void {
    setTimeout(() => {
      window.localStorage.removeItem(keys.logged);
      window.localStorage.removeItem(keys.userData);
      this.isUserLogin.next(false);
      this.isLogged.next(false);
      this.router.navigate(['/auth']);
    }, 1000);
  }

}

