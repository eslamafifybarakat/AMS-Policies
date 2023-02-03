import { AuthUserService } from './../../../auth/services/auth-user.service';
import { PolicyService } from './../../../policies/services/policy.service';
import { PublicService } from './../../../../services/public.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { DatePipe } from '@angular/common';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { DeactiveComponent } from './deactive/deactive.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloadingBtn: boolean = false;
  userdata: any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];
  pageData: any;

  constructor(
    public policyService: PolicyService,
    public publicService: PublicService,
    public alertsService: AlertsService,
    private _AuthUser: AuthUserService,
    public cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getPageData();
    this.publicService.recallUserDataStorage.subscribe((res) => {
      if (res == true) {
        this.getPageData(false);
        this.cdr.detectChanges();
      }
    });
  }


  accountInfoForm = this.fb.group({
    name: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', [Validators.required]],
    company: ['', [
      Validators.minLength(3),
      Validators.maxLength(20)]],
    gender: ['', []],
    job: [null, []]
  });
  get formControls(): any {
    return this.accountInfoForm.controls;
  }

  getPageData(activeLoading?: any): void {
    activeLoading == false ? '' : this.publicService.show_loader.next(true);
    this.userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
    this.policyService?.getPolicyFormData()?.subscribe(
      (res) => {
        if (res?.code == "200") {
          this.pageData = res?.data;
          let birth: any = moment(
            this.userdata?.birth_date,
            "DD-MM-YYYY"
          ).toDate();

          this.accountInfoForm.patchValue(
            {
              name: this.userdata?.name,
              phone: this.userdata?.phone,
              email: this.userdata?.email,
              birthdate: birth,
              gender: this.userdata?.gender,
              job: this.userdata?.job_id,
              company: this.userdata?.company
            }
          );
          this.publicService.show_loader.next(false);
          this.cdr.detectChanges();
        } else {
          this.publicService.show_loader.next(false);
          res?.message ? this.alertsService?.openSweetalert("info", res?.message) : '';
        }
      },
      (err) => {
        this.publicService.show_loader.next(false);
        err?.message ? this.alertsService?.openSweetalert("error", err?.message) : '';
      }
    );
  }

  submit(): void {
    this.publicService.show_loader.next(true);
    let data = {
      name: this.accountInfoForm?.value?.name,
      email: this.accountInfoForm?.value?.email,
      phone: this.accountInfoForm?.value?.phone,
      job_id: this.accountInfoForm?.value?.job,
      gender: this.accountInfoForm?.value?.gender,
      company: this.accountInfoForm?.value?.company,
      birth_date: this.datePipe.transform(this.accountInfoForm?.value?.birthdate, "yyyy-MM-dd"),
    }
    this._AuthUser?.editProfile(data)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          this.publicService.recallUserDataFn.next(true);
          this.publicService.show_loader.next(false);
          this.cdr.detectChanges();
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
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DeactiveComponent, {
      width: "450px",
      data: {
        email: this.accountInfoForm?.value.email
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
