import { patterns } from './../../../shared/TS Files/patternValidation';

import { Subscription } from 'rxjs';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Location, DatePipe } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { AuthUserService } from '../../services/auth-user.service';
import { TranslateService } from '@ngx-translate/core';
import Validation from "../../../shared/utils/validation";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoadingBtn: boolean = false;
  isLoadingResend: boolean = false;
  showeye: boolean = false;
  currentLanguage: any;
  deviceLocationData: any;
  isResend: boolean = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  constructor(
    public tanslationService: TranslationService,
    public translateService: TranslateService,
    public authUserService: AuthUserService,
    public alertsService: AlertsService,
    private location: Location,
    public datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.deviceLocationData = JSON.parse(window.localStorage.getItem(keys?.deviceLocation) || '{}');
    this.currentLanguage = window.localStorage.getItem(keys.language);
  }

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      lastName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birth_date: ['', []],
      password: ['', [Validators.compose([Validators.required,
      Validators.pattern(patterns?.password)])]],
      confirmPassword: ['', [Validators.compose([Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)])]]
    },
    {
      validators: [Validation.match("password", "confirmPassword")],
    }
  );
  get formControls(): any {
    return this.registerForm?.controls;
  }
  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  back(): void {
    this.location.back();
  }

  submit(): void {
    this.isLoadingBtn = true;
    this.isResend = false;
    let data = {
      name: this.registerForm?.value?.firstName + ' ' + this.registerForm?.value?.lastName,
      email: this.registerForm?.value?.email,
      phone: this.registerForm?.value?.phone,
      birth_date: this.datePipe.transform(this.registerForm?.value?.birth_date, "yyyy-MM-dd"),
      password: this.registerForm?.value?.password,
      password_confirmation: this.registerForm?.value?.confirmPassword,
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
    console.log(data);
    this.authUserService?.register(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          this.router.navigate(['/auth/login']);
          this.isLoadingBtn = false;
          this.registerForm.reset();
          this.isResend = true;
        } else {
          this.isLoadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.error) {
          err?.error ? this.alertsService.openSnackBar(err?.error) : '';
        }
        this.isLoadingBtn = false;
      }
    );
  }
  resend(): void {
    this.isLoadingResend = true;
    let data = {
      email: this.registerForm?.value?.email
    }
    this.authUserService?.resendEmail(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          this.isLoadingResend = false;
        } else {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.isLoadingResend = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
