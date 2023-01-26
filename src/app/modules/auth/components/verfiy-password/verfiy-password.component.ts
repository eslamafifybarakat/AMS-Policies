import { Subscription } from 'rxjs';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { AuthUserService } from './../../services/auth-user.service';
import { userInfo } from './../../auth-user';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-verfiy-password',
  templateUrl: './verfiy-password.component.html',
  styleUrls: ['./verfiy-password.component.scss']
})
export class VerfiyPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloading: boolean = false;
  isloadingBtn: boolean = false;
  isWaiting: boolean = false;
  urlData: any;
  time: any = Date.now() + ((60 * 1000) * 1); // current time + 1 minute ///
  minute: any;
  currentLanguage: any;
  codeLength: any;

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
    this.urlData = this.activateRoute.snapshot.params;
  }

  emailVerification = this.fb.group({
    code: [0, [Validators.required]],
    email: [userInfo.email, [Validators.required]]
  })
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

  resendCode(): void {
    this.isloading = true;
    this.isWaiting = true;
    let data = {
      email: this.urlData?.email,
    }
    this.authUserService?.forgetPassword(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          this.router.navigate(['/auth/email-verification', { code: this.codeLength }]);
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
  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  confirm(): void {
    this.isloadingBtn = true;
    let data = {
      email: this.urlData.email,
      code: this.codeLength
    }
    console.log(data);
    this.authUserService?.verificationPassword(data)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {

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
  }
  back(): void {
    this._location.back();
  }
}
