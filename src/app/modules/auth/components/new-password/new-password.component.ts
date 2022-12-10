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
  codeLength: any;
  urlData: any;

  constructor(
    public tanslationService: TranslationService,
    public translateService: TranslateService,
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    private alertsService: AlertsService,
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
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    confirmpassword: ['', Validators.required]
  },
  {
    validators: [Validation.match("newpassword", "confirmpassword")],
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
  onCodeChanged(code: string): void {
    console.log(code);
    this.codeLength = code;
  }
  onCodeCompleted(code: string): void {
    console.log(code);
    this.codeLength = code;
    console.log(this.codeLength);
  }


  submit(): void {
    this.isloadingBtn = true;
    let data = {
      code: this.codeLength,
      password: this.newPasswordForm?.value?.newpassword,
      password_confirmation: this.newPasswordForm?.value?.confirmpassword
    }
    // console.log(data);
    // this.router.navigate(['/auth/login'])

    this.authUserService?.resetPassword(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          this.isloadingBtn = false;
          this.router.navigate(['/auth/login'])

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

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
