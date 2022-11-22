import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { keys } from '../../shared/TS Files/localstorage-key';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from '../auth-user';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  apiUrl = environment.apiUrl;

  isLoggedSocial = new BehaviorSubject<boolean>(false);
  isUserLogin = new BehaviorSubject<boolean>(false);
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/users/auth/signup", data);
  }

  resendEmail(email:any):Observable<any>{
    return  this.http.post<any>(this.apiUrl + "/api/email/resend",email)
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/users/auth/login", data);
  }

  verificationCode(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/users/auth/verify-otp", data);
  }
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
    return window.localStorage.getItem(keys?.logged) ? true : false;
    // return window.localStorage.getItem(keys?.token) ? true : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  signOut(): void {
    window.localStorage.removeItem(keys.logged);
    window.localStorage.removeItem(keys.userData);
    this.router.navigate(['/auth/login']);
  }

}

