import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { AuthUserService } from './../../services/auth-user.service';
import { Subscription } from 'rxjs';
import { userInfo } from './../../auth-user';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-confirm-login-code',
  templateUrl: './confirm-login-code.component.html',
  styleUrls: ['./confirm-login-code.component.scss']
})
export class ConfirmLoginCodeComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloading: boolean = false;
  isloadingBtn: boolean = false;
  isWaiting: boolean = false;
  urlData: any;
  time: any = Date.now() + ((60 * 1000) * 1); // current time + 1 minute ///
  minute: any;
  currentLanguage: any;
  codeLength: any;
  deviceLocationData: any;

  constructor(
    public translationService: TranslationService,
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    public alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    public _location: Location,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.minute = this.time;
    this.deviceLocationData = JSON.parse(window.localStorage.getItem(keys?.deviceLocation) || '{}');
    this.urlData = this.activateRoute.snapshot.params;
  }

  confirmLoginForm = this.fb.group({
    email: [userInfo.email],
    code: [0, Validators.required]
  })

  resendCode(): void {
    this.isloading = true;
    this.isWaiting = true;
    let data = {
      email: this.urlData?.email,
      password: this.urlData?.password,
      device_location_info: this.deviceLocationData
    }
    this.authUserService?.login(data)?.subscribe(
      (res: any) => {
        if (res?.status == true && res?.code == 200) {
          this.codeLength = '';
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        } else {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
      }
    );
    this.minute = Date.now() + ((60 * 1000) * 1);
    this.isloading = false;
    this.isWaiting = false;
  }
  confirm(): void {
    this.isloadingBtn = true;
    let data = {
      email: this.urlData.email,
      password: this.urlData.password,
      code: this.codeLength
    }
    console.log(data);
    this.authUserService?.verificationCode(data)?.subscribe(
      (res: any) => {
        if (res?.status == true) {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          window.localStorage.setItem(keys.userLoginData, JSON.stringify(res?.data));
          this.authUserService?.getUserData()?.subscribe(
            (res: any) => {
              if (res?.code == 200) {
                window.localStorage.setItem(keys.userData, JSON.stringify(res?.data));
                this.router.navigate(['/home']);
                this.isloadingBtn = false;
              } else {
                this.isloadingBtn = false;
                res?.message ? this.alertsService.openSnackBar(res?.message) : '';
              }
            },
            (err: any) => {
              if (err?.message) {
                err?.message ? this.alertsService.openSnackBar(err?.message) : '';
              }
              this.isloadingBtn = false;
            }
          );
          this.isloadingBtn = false;
          this.confirmLoginForm.reset();
        } else {
          this.isloadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.isloadingBtn = false;
      }
    );
  }

  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }
  back(): void {
    this._location.back();
  }

  onCodeChanged(code: string): void {
    this.codeLength = code;
  }
  onCodeCompleted(code: string): void {
    this.codeLength = code;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
