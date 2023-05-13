import { CheckValidityService } from './../../../../services/check-validity.service';
import { patterns } from './../../../shared/TS Files/patternValidation';
import { PublicService } from './../../../../services/public.service';
import { AuthUserService } from './../../services/auth-user.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { TranslateService } from '@ngx-translate/core';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Validation from "../../../shared/utils/validation";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloadingBtn: boolean = false;
  showeye: boolean = false;
  showeye2: boolean = false;
  currentLanguage: any;
  urlData: any;

  constructor(
    private checkValidityService: CheckValidityService,
    public tanslationService: TranslationService,
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
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.urlData = this.activateRoute.snapshot.params;
  }

  newPasswordForm = this.fb.group({
    newpassword: ['', [
      Validators.required,
      Validators.pattern(patterns?.password)
    ]],
    confirmpassword: ['', Validators.required]
  },
    {
      validators: [Validation.match("newpassword", "confirmpassword")], updateOn: 'blur'
    }
  )
  get formControls(): any {
    return this.newPasswordForm.controls;
  }

  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  togglepassword_confirm(): void {
    this.showeye2 = !this.showeye2;
  }
  back(): void {
    this.location.back();
  }

  submit(): void {
    if (this.newPasswordForm?.valid) {
      this.publicService.show_loader.next(true);
      let data = {
        email: this.urlData?.email,
        password: this.newPasswordForm?.value?.newpassword,
        password_confirmation: this.newPasswordForm?.value?.confirmpassword,
        token: window.localStorage.getItem(keys?.forgetPassoedToken)
      }

      this.authUserService?.resetPassword(data)?.subscribe(
        (res: any) => {
          if (res?.code == 200) {
            res?.message ? this.alertsService.openSweetAlert('info', res?.message) : '';
            this.publicService.show_loader.next(false);
            window.localStorage.removeItem(keys?.forgetPassoedToken);
            this.router.navigate(['/auth/login']);
          } else {
            this.publicService.show_loader.next(false);
            res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          }
        },
        (err: any) => {
          if (err?.message) {
            err?.message ? this.alertsService.openSnackBar(err?.message) : '';
          }
          this.publicService.show_loader.next(false);
        }
      );
    } else {
      this.checkValidityService?.validateAllFormFields(this.newPasswordForm);
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
