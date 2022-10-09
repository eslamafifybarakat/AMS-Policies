import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { AuthUserService } from '../../services/auth-user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  LOCALIZATION_LOCAL_STORAGE_KEY = "xsite";
  isloadingBtn: boolean = false;
  showeye: boolean = false;
  showeye2: boolean = false;
  currentLanguage: any;

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  constructor(
    private fb: FormBuilder,
    public tanslationService: TranslationService,
    public translateService: TranslateService,
    public alertsService: AlertsService,
    private location: Location,
    public _AuthUserser: AuthUserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(this.LOCALIZATION_LOCAL_STORAGE_KEY);
  }

  registerform = this.fb.group(
    {
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.compose([Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)])]],
      confirmpassword: ['', [Validators.compose([Validators.required])]]
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  );
  get formControls(): any {
    return this.registerform?.controls;
  }
  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  togglepassword_confirm() {
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
}
