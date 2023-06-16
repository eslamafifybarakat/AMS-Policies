import { CheckValidityService } from './../../../../services/check-validity.service';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { patterns } from './../../../shared/TS Files/patternValidation';
import { PublicService } from './../../../../services/public.service';
import { AuthUserService } from './../../services/auth-user.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  currentLanguage: any;
  urlData: any;

  constructor(
    private checkValidityService: CheckValidityService,
    public translateService: TranslateService,
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private location: Location,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys.language);
    this.urlData = this.activateRoute?.snapshot?.params;
  }

  newPasswordForm = this.fb.group({
    newPassword: ['', {
      validators: [Validators.required,
      Validators.pattern(patterns?.password)], updateOn: 'blur'
    }],
    confirmPassword: ['', {
      validators: [Validators.required,
      Validators.pattern(patterns?.password)], updateOn: 'blur'
    }]
  },
    {
      validator: ConfirmPasswordValidator.MatchPassword

    }
  )
  get formControls(): any {
    return this.newPasswordForm?.controls;
  }

  back(): void {
    this.location?.back();
  }

  submit(): void {
    if (this.newPasswordForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let data = {
        email: this.urlData?.email,
        password: this.newPasswordForm?.value?.newPassword,
        password_confirmation: this.newPasswordForm?.value?.confirmPassword,
        token: window.localStorage.getItem(keys?.forgetPassoedToken)
      }
      this.authUserService?.resetPassword(data)?.subscribe(
        (res: any) => {
          if (res?.code == 200) {
            res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
            this.publicService?.show_loader?.next(false);
            window?.localStorage?.removeItem(keys?.forgetPassoedToken);
            this.router?.navigate(['/auth/login']);
          } else {
            this.publicService?.show_loader?.next(false);
            res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          }
        },
        (err: any) => {
          if (err?.message) {
            err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
          }
          this.publicService?.show_loader?.next(false);
        }
      );
    } else {
      this.checkValidityService?.validateAllFormFields(this.newPasswordForm);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
