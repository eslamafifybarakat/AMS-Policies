import { keys } from './../../../shared/TS Files/localstorage-key';
import { DatePipe } from '@angular/common';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { DeactiveComponent } from './deactive/deactive.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
  userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];


  job: any[] = [];
  jobNames = ['Uber', 'Microsoft', 'Flexigen'];

  constructor(
    public alertsService: AlertsService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public router: Router,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
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
        company: this.userdata?.company
      }
    );
    this.jobNames.forEach((c, i) => {
      this.job.push({ id: i, name: c });
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
    gender: ['', [Validators.required]],
    job: [null, Validators.required]
  });
  get formControls(): any {
    return this.accountInfoForm.controls;
  }

  submit(): void {
    this.isloadingBtn = true;
    console.log(this.accountInfoForm);
    let data = {
      name: this.accountInfoForm?.value?.name,
      email: this.accountInfoForm?.value?.email,
      phone: this.accountInfoForm?.value?.phone,
      birth_date: this.datePipe.transform(this.accountInfoForm?.value?.birthdate, "yyyy-MM-dd"),
    }
    console.log(data);

    // setTimeout(() => {
    //   this.accountInfoForm.patchValue(
    //     {
    //       name: 'Eslam Barakat',
    //       phone: '01012525233',
    //       email: 'xsite@ME.com',
    //       birthdate: '10/10/1996',
    //       company: 'ME Company'
    //     }
    //   );
    //   this.isloadingBtn = false;
    // }, 2000);
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
