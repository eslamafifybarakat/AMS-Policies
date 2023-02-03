import { DeviceLocationService } from './../../../../services/device-location.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmLoginCodeComponent } from './../confirm-login-code/confirm-login-code.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { userInfo } from '../../auth-user';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  showeye: boolean = false;
  currentLanguage: any;
  deviceLocationData: any;

  loginData: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  isLoggedin?: boolean;
  userData: any = userInfo;
  isLoadingBtn: boolean = false;

  constructor(
    public translationService: TranslationService,
    private authUserService: AuthUserService,
    private alertsService: AlertsService,
    public _AuthUser: AuthUserService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.deviceLocationData = JSON.parse(window.localStorage.getItem(keys?.deviceLocation) || '{}');
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)]]
  });
  get formControls(): any {
    return this.loginForm?.controls;
  }

  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  forgetPassword(): void {
    this.router.navigate(['/auth/forget-password'])
  }
  back(): void {
    this.location.back();
  }

  submit(): void {
    this.isLoadingBtn = true;
    let data = {
      email: this.loginForm?.value?.email,
      password: this.loginForm?.value?.password,
      location_device_info: {
        country_name: this.deviceLocationData?.country_name,
        region: this.deviceLocationData?.region,
        city: this.deviceLocationData?.city,
        browser: this.deviceLocationData?.browser,
        browser_version: this.deviceLocationData?.browser_version,
        device_type: this.deviceLocationData?.deviceType,
        os: this.deviceLocationData?.os,
        os_version: this.deviceLocationData?.os_version
      }
    }
    this.authUserService?.login(data)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          window.localStorage.setItem(keys.token, res?.data?.token);
          window.localStorage.setItem(keys.userLoginData, JSON.stringify(res?.data));
          if (res?.data?.verified == true) {
            this.authUserService?.getUserData()?.subscribe(
              (res: any) => {
                if (res?.code == 200) {
                  window.localStorage.setItem(keys.userData, JSON.stringify(res?.data));
                  this.router.navigate(['/home']);
                  this.isLoadingBtn = false;
                } else {
                  this.isLoadingBtn = false;
                  res?.message ? this.alertsService.openSnackBar(res?.message) : '';
                }
              },
              (err: any) => {
                if (err?.message) {
                  err?.message ? this.alertsService.openSnackBar(err?.message) : '';
                }
                this.isLoadingBtn = false;
              }
            );
          } else {
            res?.message ? this.alertsService.openSnackBar(res?.message) : '';
            this.router.navigate(['/auth/confirm-login-code', {
              user_id: res?.data?.id,
              email: this.loginForm?.value?.email,
              password: this.loginForm?.value?.password
            }]);
          }
          // if (res?.data?.token !== null) {
          //   res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          //   this.loginForm.reset();
          //   this.router.navigate(['/home']);
          //   this.isLoadingBtn = false;
          // } else {
          //   this.router.navigate(['/auth/confirm-login-code', {
          //     user_id: res?.data?.id,
          //     email: this.loginForm?.value?.email,
          //     password: this.loginForm?.value?.password
          //   }])
          // }

        } else {
          this.isLoadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.isLoadingBtn = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

