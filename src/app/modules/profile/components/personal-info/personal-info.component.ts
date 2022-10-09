import { DeactiveComponent } from './deactive/deactive.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';

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

  langs: any = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Arabic' },
    { id: 3, name: 'Freanch' },
    { id: 4, name: 'Italanio' },
  ];
  timeszone: any = [
    { id: 1, name: '(GMT-7:00)' },
    { id: 2, name: '(GMT-11:00)' },
    { id: 3, name: 'GMT-9:00)' },
    { id: 4, name: '(GMT-11:00)' },
  ];
  skills: any[] = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
    { id: 4, name: 'BOOTSTRAP 5' },
    { id: 5, name: 'REXJS' },
    { id: 6, name: 'ANGULAR' },
  ];
  accounts = [
    { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', child: { state: 'Active' } },
    { name: 'Homer', email: 'homer@email.com', age: 47, country: '', child: { state: 'Active' } },
    { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States', child: { state: 'Active' } },
    { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina', child: { state: 'Active' } },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina', child: { state: 'Active' } },
    { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador', child: { state: 'Active' } },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador', child: { state: 'Inactive' } },
    { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador', child: { state: 'Inactive' } },
    { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } },
    { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia', child: { state: 'Inactive' } },
    { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } }
  ];

  brands: any[] = [];
  loading = false;
  brandsNames = ['Uber', 'Microsoft', 'Flexigen'];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.accountInfoForm.patchValue(
      {
        name: 'Eslam Barakat',
        phone: '01012525233',
        email: 'xsite@ME.com',
        birthdate: '10/10/1996',
        company: 'ME Company'
      }
    );
    this.brandsNames.forEach((c, i) => {
      this.brands.push({ id: i, name: c });
    });
  }

  addTagPromise(name: any): any {
    return new Promise((resolve) => {
      this.loading = true;
      // Simulate backend call.
      setTimeout(() => {
        resolve({ id: 5, name: name, valid: true });
        this.loading = false;
      }, 500);
    })
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
    gender: [null, [Validators.required]],
    language: [null, Validators.required],
    timeszone: [null, Validators.required],
    skills: [null, Validators.required],
    brands: [null, Validators.required],
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
  back(): void {
    this.location.back();
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
