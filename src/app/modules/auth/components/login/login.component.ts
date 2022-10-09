import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmLoginCodeComponent } from './../confirm-login-code/confirm-login-code.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { userInfo } from '../../auth-user';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  showeye: boolean = false;
  currentLanguage: any;
  LOCALIZATION_LOCAL_STORAGE_KEY = "xsite";

  loginData: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  isLoggedin?: boolean;
  userData: any = userInfo;
  isloadingBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    public tanslationService: TranslationService,
    private translateService: TranslateService,
    private alertsService: AlertsService,
    private location: Location,
    public _AuthUser: AuthUserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(this.LOCALIZATION_LOCAL_STORAGE_KEY);
    this.loginform.patchValue(
      {
        phone: userInfo.phone,
        email: userInfo.email,
        password: userInfo.password
      }
    );
  }

  loginform = this.fb.group({
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)]]
  });
  get formControls(): any {
    return this.loginform?.controls;
  }

  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  back(): void {
    this.location.back();
  }

  submit(): void {
    this.loginData = this._AuthUser?.login(this.loginform?.value?.email, this.loginform?.value?.password);
    if (this.loginData['status'] == true) {
      this.isloadingBtn = true;
      window.localStorage.setItem("isauth", "true");

      setTimeout(() => {
        this.isloadingBtn = false;
        let dialogRef = this.dialog.open(ConfirmLoginCodeComponent, {
          width: "auto",
          data: {
            email: userInfo.email
          }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          this.isloadingBtn = true;
          console.log(result);
          if (result?.verified) {
            setTimeout(() => {
              this.router.navigate(['/']);
              this.alertsService.openSweetalert("success", this.translateService.instant('general.loggin_Success'));
              this.isloadingBtn = false;
            }, 500);
          } else {
            this.isloadingBtn = false;
          }
        });
      }, 1000);
    }
    else {
      alert(this.loginData['message']);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

