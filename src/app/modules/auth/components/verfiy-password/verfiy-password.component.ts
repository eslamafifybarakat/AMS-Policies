import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../services/public.service';
import { AuthUserService } from './../../services/auth-user.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-verfiy-password',
  templateUrl: './verfiy-password.component.html',
  styleUrls: ['./verfiy-password.component.scss']
})
export class VerfiyPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isLoading: boolean = false;
  isLoadingBtn: boolean = false;
  isWaiting: boolean = false;
  urlData: any;
  time: any = Date.now() + ((60 * 1000) * 1);
  minute: any;
  currentLanguage: any;
  codeLength: any;
  email: any;

  constructor(
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    private publicService: PublicService,
    public alertsService: AlertsService,
    public _location: Location,
    public fb: FormBuilder,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys.language);
    this.urlData = this.activateRoute?.snapshot?.params;
    this.minute = this.time;
    if (this.urlData?.email) {
      this.emailVerification?.patchValue({
        email: this.urlData?.email
      });
      this.email = this.urlData?.email;
    }
  }

  emailVerification = this.fb?.group({
    email: ['', [Validators.required]]
  })

  onCodeChanged(code: string): void {
    this.codeLength = code;
  }
  onCodeCompleted(code: string): void {
    this.codeLength = code;
  }

  resendCode(): void {
    this.isWaiting = true;
    let data = {
      email: this.urlData?.email,
    }
    this.publicService.show_loader.next(true);
    this.authUserService?.forgetPassword(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          this.codeLength = '';
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.publicService?.show_loader?.next(false);
          this.minute = Date.now() + ((60 * 1000) * 1);
          this.isWaiting = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.publicService?.show_loader?.next(false);
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
          this.publicService.show_loader.next(false);
        }
      }
    );
  }
  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  confirm(): void {
    this.publicService?.show_loader?.next(true);
    let data = {
      email: this.urlData?.email,
      code: this.codeLength
    }
    this.authUserService?.verificationPassword(data)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          window.localStorage?.setItem(keys?.forgetPassoedToken, res?.data?.token);
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.router.navigate(['/auth/new-password', { email: this.urlData?.email }]);
          this.publicService?.show_loader?.next(false);
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.publicService?.show_loader?.next(false);
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
          this.publicService?.show_loader?.next(false);
        }
      }
    );
  }
  back(): void {
    this._location?.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
