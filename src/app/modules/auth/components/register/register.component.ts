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
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoadingBtn: boolean = false;
  showeye: boolean = false;
  showeye2: boolean = false;
  currentLanguage: any;
  deviceLocationData: any;
  showResend:boolean=false;
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
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.deviceLocationData = JSON.parse(window.localStorage.getItem(keys?.deviceLocation) || '{}');
  }

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birth_date: ['', [Validators.required]],
      password: ['', [Validators.compose([Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)])]],
      confirmPassword: ['', [Validators.compose([Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)])]]
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  );
  get formControls(): any {
    return this.registerForm?.controls;
  }
  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  togglepassword_confirm():void {
    this.showeye2 = !this.showeye2;
  }
  back(): void {
    this.location.back();
  }


  submit(): void {
    this.isLoadingBtn = true;
    let data = {
      registration:{
        name: this.registerForm?.value?.name,
        email: this.registerForm?.value?.email,
        phone: this.registerForm?.value?.phone,
        birth_date: this.datePipe.transform(this.registerForm?.value?.birth_date, "yyyy-MM-dd"),
        password: this.registerForm?.value?.password,
        password_confirmation: this.registerForm?.value?.confirmPassword,
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
    this.authUserService?.register(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
            res?.message ? this.alertsService.openSweetalert('info', this.translateService.instant(res?.message)): '';
            this.isLoadingBtn = false;
            this.registerForm.reset();
            this.showResend=true;
        } else {
          this.isLoadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.isLoadingBtn = false;
      }
    );
  }
  resend():void{
    this.authUserService?.resendEmail(this.registerForm?.value?.email)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
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
  }
}
