import { TranslationService } from '../../../shared/services/i18n/translation.service';
import { AlertsService } from '../../../shared/services/alerts/alerts.service';
import { patterns } from '../../../shared/TS Files/patternValidation';
import { PublicService } from '../../../../services/public.service';
import { keys } from '../../../shared/TS Files/localstorage-key';
import { AuthUserService } from '../../services/auth-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  urlData: any

  constructor(
    public translationService: TranslationService,
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private location: Location,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    this.urlData = this.activateRoute?.snapshot?.params;
  }

  forgetPasswordForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(patterns?.email)]]
    }, { updateOn: "blur" }
  );
  get formControls(): any {
    return this.forgetPasswordForm?.controls;
  }

  submit(): void {
    if (this.forgetPasswordForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let data = {
        email: this.forgetPasswordForm?.value?.email
      }
      this.authUserService?.forgetPassword(data)?.subscribe(
        (res: any) => {
          if (res?.status == 'success') {
            res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
            this.publicService?.show_loader?.next(false);
            this.router?.navigate(['/auth/email-verification', { email: this.forgetPasswordForm?.value?.email }]);
          } else {
            this.publicService?.show_loader?.next(false);
            res?.message ? this.alertsService?.openSweetAlert('error', res?.message) : '';
          }
        },
        (err: any) => {
          if (err?.message) {
            err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
          }
          this.publicService?.show_loader?.next(false);
        }
      );
    }
    else {
      this.publicService?.validateAllFormFields(this.forgetPasswordForm);
    }
  }

  back(): void {
    this.location?.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
