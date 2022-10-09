import { keys } from './../../../shared/TS Files/localstorage-key';
import { Router } from '@angular/router';
import { VerfiyPasswordComponent } from './../verfiy-password/verfiy-password.component';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../../shared/services/i18n/translation.service';


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

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private location: Location,
    public tanslationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
  }

  forgetPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })
  get formControls(): any {
    return this.forgetPassword.controls;
  }

  submit(): void {
    this.isloadingBtn = true;
    setTimeout(() => {
      this.isloadingBtn = false;
      let dialogRef = this.dialog.open(VerfiyPasswordComponent, {
        width: "500px",
        data: {
          email: this.forgetPassword?.value?.email
        }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.isloadingBtn = true;
        console.log(result);
        if (result?.verified) {
          setTimeout(() => {
            this.router.navigate(['/auth/new-password']);
            this.isloadingBtn = false;
          }, 500);
        } else {
          this.isloadingBtn = false;
        }
      });
    }, 1000);
  }
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
