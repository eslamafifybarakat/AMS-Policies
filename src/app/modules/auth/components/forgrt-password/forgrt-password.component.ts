import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { Router, ActivatedRoute } from '@angular/router';
import { VerfiyPasswordComponent } from './../verfiy-password/verfiy-password.component';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { AuthUserService } from '../../services/auth-user.service';


@Component({
  selector: 'app-forgrt-password',
  templateUrl: './forgrt-password.component.html',
  styleUrls: ['./forgrt-password.component.scss']
})
export class ForgrtPasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloadingBtn: boolean = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  currentLanguage: any;
  urlData: any
  email: any;

  constructor(
    public translationService: TranslationService,
    public authUserService: AuthUserService,
    private activateRoute: ActivatedRoute,
    public alertsService: AlertsService,
    private location: Location,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.urlData = this.activateRoute.snapshot.params;
  }

  submit(): void {
    this.isloadingBtn = true;
    let data = {
      email: this.email
    }
    this.authUserService?.forgetPassword(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          this.isloadingBtn = false;
          this.router.navigate(['/auth/email-verification', { email: this.email }]);
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
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
