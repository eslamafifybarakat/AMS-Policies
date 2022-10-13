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

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];


  job: any[] = [];
  jobNames = ['Uber', 'Microsoft', 'Flexigen'];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    let birth: any = moment(
      '10/10/1996',
      "DD-MM-YYYY"
    ).toDate();

    this.accountInfoForm.patchValue(
      {
        name: 'Eslam Barakat',
        phone: '01012525233',
        email: 'xsite@ME.com',
        birthdate: birth,
        gender: 'male',
        company: 'ME Company'
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
    language: [null, Validators.required],
    timeszone: [null, Validators.required],
    skills: [null, Validators.required],
    job: [null, Validators.required],
    account: [null, Validators.required],
  });
  get formControls(): any {
    return this.accountInfoForm.controls;
  }

  submit(): void {
    this.isloadingBtn = true;
    console.log(this.accountInfoForm);
    setTimeout(() => {
      this.accountInfoForm.patchValue(
        {
          name: 'Eslam Barakat',
          phone: '01012525233',
          email: 'xsite@ME.com',
          birthdate: '10/10/1996',
          company: 'ME Company'
        }
      );
      this.isloadingBtn = false;
    }, 2000);
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
