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
  codeLength:any;
  deviceLocationData: any;

  constructor(
    public translationService: TranslationService,
    public authUserService:AuthUserService,
    private activateRoute: ActivatedRoute,
    public alertsService:AlertsService,
    private cdr: ChangeDetectorRef,
    public _location:Location,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.minute = this.time;
    this.deviceLocationData = JSON.parse(window.localStorage.getItem(keys?.deviceLocation) || '{}');
    this.urlData = this.activateRoute.snapshot.params;
    console.log(this.urlData);
  }

  confirmLoginForm = this.fb.group({
    email:[userInfo.email],
    code: [0, Validators.required]
  })

  resendCode(): void {
    this.isloading = true
    setTimeout(() => {
      this.isloading = false;
      this.isWaiting = false;
      this.minute = Date.now() + ((60 * 1000) * 0.1);
      this.cdr.detectChanges();
    }, 500);
  }
  confirm(): void {
    this.isloadingBtn = true;
    let data = {
      otp:{
        user_id: this.urlData.user_id,
        code:this.codeLength
      },
      auth_location_and_device_info: {
        country_name: this.deviceLocationData?.country_name,
        region:this.deviceLocationData?.region,
        city: this.deviceLocationData?.city,
        browser: this.deviceLocationData?.browser,
        browser_version:this.deviceLocationData?.browser_version,
        deviceType: this.deviceLocationData?.deviceType,
        os: this.deviceLocationData?.os,
        os_version: this.deviceLocationData?.os_version
      }
    }
    console.log(data);
    this.authUserService?.verificationCode(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
            res?.message ? this.alertsService.openSweetalert('info',res?.message): '';
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
    // setTimeout(() => {
    //   console.log(this.confirmLoginForm.value);
    //   this.isloadingBtn = false;
    //   this.router.navigate(['/home'])
    //   this.isWaiting = false;
    // }, 2000);
  }

  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  back():void{
    this._location.back();
  }
   // this called every time when user changed the code
   onCodeChanged(code: string): void {
    console.log(code);
    this.codeLength = code;
  }

  // this called only if user entered full code
  onCodeCompleted(code: string): void {
    console.log(code);
    this.codeLength = code;
    console.log(this.codeLength);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
