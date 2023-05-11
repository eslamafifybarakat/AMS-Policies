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
  ) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/register", data);
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/api/site/profile");
  }

  resendEmail(email: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/email/resend", email)
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/login", data);
  }

  verificationCode(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/verify-email", data);
  }
  forgetPassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/forget-password", data);
  }
  verificationPassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/verify-password-code", data);
  }
  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/site/password-reset", user);
  }

  editProfile(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/api/site/edit-profile", data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/api/site/change-password", data);
  }

  isLoggedIn(): boolean {
    // return window.localStorage.getItem(keys?.logged) ? true : false;
    return window.localStorage.getItem(keys.token) ? true : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  signOut(): void {
    window.localStorage.removeItem(keys.policyPayId);
    window.localStorage.removeItem(keys.forgetPassoedToken);
    window.localStorage.removeItem(keys.logged);
    window.localStorage.removeItem(keys.userData);
    window.localStorage.removeItem(keys.token);
    this.router.navigate(['/auth/login']);
  }

}

