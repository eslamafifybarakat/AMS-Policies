import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss']
})
export class PolicyDataComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isloading: boolean = false;

  jobNames = ['Uber', 'Microsoft', 'Flexigen'];

  nationalityNames = ['Uber', 'Microsoft', 'Flexigen'];

  todayDate: Date = new Date();

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];


  constructor(
    private fb: FormBuilder,
    private location: Location,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  policyForm = this.fb.group({
    policy_id: ['', [Validators.required]],
    name: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    start_date: ["", [Validators.required]],
    end_date: ["", [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    job: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    nationality: [null, Validators.required],
    address: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    passport_number: [null, [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
  });
  get formControls(): any {
    return this.policyForm.controls;
  }
  submit(): void {
    console.log(this.policyForm?.value);
    this.router.navigate(['/home/policies/checkout']);
  }
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
