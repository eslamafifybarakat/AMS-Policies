import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { CheckValidityService } from './../../../../services/check-validity.service';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { patterns } from './../../../shared/TS Files/patternValidation';
import { PublicService } from './../../../../services/public.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { AuthUserService } from '../../services/auth-user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Location, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoadingBtn: boolean = false;
  isLoadingResend: boolean = false;
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
    private checkValidityService: CheckValidityService,
    public translateService: TranslateService,
    public authUserService: AuthUserService,
    public publicService: PublicService,
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
      firstName: ['', {
        validators: [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)], updateOn: 'blur'
      }],
      lastName: ['', {
        validators: [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)], updateOn: 'blur'
      }],
      phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
      email: ['', { validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: 'blur' }],
      birth_date: ['', [Validators.required]],
      password: ['', {
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
  );
  get formControls(): any {
    return this.registerForm?.controls;
  }

  back(): void {
    this.location?.back();
  }

  submit(): void {
    if (this.registerForm?.valid) {
      this.publicService.show_loader.next(true);
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
      this.authUserService?.register(data)?.subscribe(
        (res: any) => {
          if (res?.status == 'success') {
            res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
            this.router?.navigate(['/auth/login']);
            this.publicService?.show_loader?.next(false);
            this.registerForm?.reset();
            this.isResend = true;
          } else {
            this.publicService?.show_loader?.next(false);
            res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          }
        },
        (err: any) => {
          if (err) {
            err ? this.alertsService?.openSweetAlert('error', err) : '';
          }
          this.publicService?.show_loader?.next(false);
        }
      );
    } else {
      this.checkValidityService?.validateAllFormFields(this.registerForm);
    }
  }
  resend(): void {
    this.isLoadingResend = true;
    let data = {
      email: this.registerForm?.value?.email
    }
    this.authUserService?.resendEmail(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isLoadingResend = false;
        } else {
        }
      },
      (err: any) => {
        if (err?.message) {
        }
        this.isLoadingResend = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
