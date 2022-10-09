import { HttpClient } from '@angular/common/http';
import { keys } from '../../shared/TS Files/localstorage-key';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
    private socialAuthService: SocialAuthService
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



  signInWithGoogle(): void {
    this.isUserLogin.next(true);
    this.socialAuthService?.signIn(GoogleLoginProvider?.PROVIDER_ID)
      .then((res) => {
        let data = {
          email: res?.email,
          social_id: res?.id,
          name: res?.name,
          photo: res?.photoUrl,
        };
        if (data.social_id) {
          window.localStorage.setItem(keys.logged, 'true');
          window.localStorage.setItem(keys.userData, JSON.stringify(data));
        }
        setTimeout(() => {
          this.isLogged.next(true);
          this.isLoggedSocial.next(true);
          this.isUserLogin.next(false);
          this.router.navigate(['/']);
        }, 1000);
      })
      .catch((error) => {
        if (error?.message) {
          console.log(error);
        }
      });
  }
  signInWithFB(): void {
    this.socialAuthService?.signIn(FacebookLoginProvider?.PROVIDER_ID)
      .then((res) => {
        let data = {
          email: res?.email,
          social_id: res?.id,
          name: res?.name,
          photo: res?.photoUrl,
          from: res?.response?.idpId,
        };
        this.signWithSocial(data);
      })
      .catch((error) => {
        if (error?.message) {
          // this.sweetAlertPopupService?.alertMessage(error?.message, "error");
        }
      });
  }
  signWithSocial(data: any) {
    // let from_social = data?.from;
    // return this.http
    //   .post<any>(this.apiUrl + "/auth/callback/" + from_social, data)
    //   .subscribe(
    //     (res: any) => {
    //       if (res?.status) {
    //         window?.localStorage?.setItem(keys.userData, JSON.stringify(res));
    //         this.api_token = res?.data?.api_token;
    //         if (res?.message) {
    //           this.sweetAlertPopupService?.alertMessage(
    //             res?.message,
    //             "success"
    //           );
    //         }
    //         this.router.navigate([""]);
    //       } else {
    //         if (res?.message) {
    //           this.sweetAlertPopupService?.alertMessage(
    //             res?.message,
    //             "success"
    //           );
    //         }
    //       }
    //     },
    //     (err) => {
    //       if (err?.message) {
    //         this.sweetAlertPopupService?.alertMessage(err?.message, "error");
    //       }
    //     }
    //   );
  }

  signOut(): void {
    setTimeout(() => {
      window.localStorage.removeItem(keys.logged);
      window.localStorage.removeItem(keys.userData);
      this.isUserLogin.next(false);
      this.isLogged.next(false);
      this.isLoggedSocial.subscribe((res: any) => {
        if (res) {
          this.socialAuthService.signOut();
          this.isLoggedSocial.next(false);
        }
      });
      this.router.navigate(['/auth']);
    }, 1000);
  }

}

