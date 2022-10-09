import { TranslateService } from '@ngx-translate/core';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { Location } from '@angular/common';

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
  LOCALIZATION_LOCAL_STORAGE_KEY = "xsite";

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private location: Location,
    public tanslationService: TranslationService,
    public translateService: TranslateService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(this.LOCALIZATION_LOCAL_STORAGE_KEY);

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
      validator: ConfirmPasswordValidator.MatchPassword
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
    this.isloadingBtn = true;
    setTimeout(() => {
      this.isloadingBtn = false;
      this.alertsService.openSweetalert('info', this.translateService.instant('general.check_email'));
      this.router.navigate(['/auth/login']);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
