import { AlertsService } from './../../../../../shared/services/alerts/alerts.service';
import { PolicyService } from './../../../../services/policy.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss']
})
export class PolicyDataComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;

  isEdit: boolean = false;
  policyId: any = null;
  policyData: any = null;

  passportImageFile: File[] = [];
  isMaxImage: boolean = false;

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
    private policyService: PolicyService,
    private alertsService: AlertsService,
    private fb: FormBuilder,
    private location: Location,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.policyId = this.activatedRoute?.snapshot?.params['id'];
    if (this.policyId) {
      this.isEdit = true;
      this.policyForm.controls['policy_id'].disable();
      this.getPloicyData(this.policyId);
    }
  }

  policyForm = this.fb.group({
    policy_id: ['', [Validators.required]],
    name: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    start_date: ["", [Validators.required]],
    end_date: ["", [Validators.required]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    passport_image: [null, [Validators.required]],
    duration_type: ['', [Validators.required]],
    job: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    nationality: [null, Validators.required],
    address: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    virus_c: [null, [Validators.required]],
    virus_corona: [null, [Validators.required]],
    suffer: [null, [Validators.required]],
    poor_hearing: [null, [Validators.required]],
  });
  get formControls(): any {
    return this.policyForm.controls;
  }

  getPloicyData(id: any): void {
    // this.isLoading = true;
    // this.policyService?.getPolicyById(id)?.subscribe(
    //   (res) => {
    //     this.policyData = res?.data;
    //     this.policyForm?.patchValue({
    //       policy_id: this.policyData?.,
    //       name: this.policyData?.,
    //       start_date: this.policyData?.,
    //       end_date: this.policyData?.,
    //       birthdate: this.policyData?.,
    //       email: this.policyData?.,
    //       phone: this.policyData?.,
    //       duration: this.policyData?.,
    //       passport_image: this.policyData?.,
    //       duration_type: this.policyData?.,
    //       job: this.policyData?.,
    //       gender: this.policyData?.,
    //       nationality: this.policyData?.,
    //       address: this.policyData?.,
    //       passport_number: this.policyData?.,
    //       virus_c: this.policyData?.,
    //       virus_corona: this.policyData?.,
    //       suffer: this.policyData?.,
    //       poor_hearing: this.policyData?.,
    //     });
    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     if (err?.message) {
    //       this.alertsService?.openSweetalert("error", err?.message);
    //     }
    //   }
    // );
  }

  passportImageFileChangeEvent(event: any): void {
    // for (var i = 0; i < event?.target?.files?.length; i++) {
    //   if (event?.target?.files[i]?.size <= 5120 * 1024) {
    //     this.isMaxImage = false;
    //     this.passportImageFile.push(event?.target?.files[i]);
    //   } else {
    //     this.isMaxImage = true;
    //   }
    // }
    if (event?.target?.files[0]?.size <= 5120 * 1024) {
      this.isMaxImage = false;
      this.passportImageFile[0] = event?.target?.files[0];
    } else {
      this.isMaxImage = true;
    }
  }
  onRemovePassportImage(name: any): void {
    this.passportImageFile = this.passportImageFile?.filter((value: any) => {
      return value?.name !== name;
    });
    this.policyForm?.get('passport_image')?.reset();
    this.cdr.detectChanges();
  }

  submit(): void {
    console.log(this.policyForm?.value);
    this.router.navigate(['/home/policies/checkout', { data: JSON.stringify(this.policyForm?.value), isEdit: this.isEdit }]);
  }

  update(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home/policies/list']);
    }, 2000);

    // this.isLoading = true;

    // let policyDataObj: any;
    // if (this.isEdit) {
    //   policyDataObj = {
    //     policy_id: this.policyData?.policy_id,
    //     name: this.policyData?.name,
    //     start_date: this.policyData?.start_date,
    //     end_date: this.policyData?.end_date,
    //     birthdate: this.policyData?.birthdate,
    //     email: this.policyData?.email,
    //     phone: this.policyData?.phone,
    //     duration: this.policyData?.duration,
    //     duration_type: this.policyData?.duration_type,
    //     passport_image: this.policyData?.passport_image,
    //     job: this.policyData?.job,
    //     gender: this.policyData?.gender,
    //     nationality: this.policyData?.nationality,
    //     address: this.policyData?.address,
    //     virus_c: this.policyData?.virus_c,
    //     virus_corona: this.policyData?.virus_corona,
    //     suffer: this.policyData?.suffer,
    //     poor_hearing: this.policyData?.poor_hearing
    //   }
    //   this.policyService?.updatePolicy(policyDataObj, this.policyData?.policy_id)?.subscribe(
    //     (res: any) => {
    //       if (res?.code === 200) {
    //         this.alertsService.openSweetalert('success', res?.message);
    //         this.router.navigate(['/home/policies/list']);
    //         this.isLoading = false;
    //       } else {
    //         this.alertsService.openSweetalert('info', res?.message);
    //         this.isLoading = false;
    //       }
    //     },
    //     (err) => {
    //       if (err?.message) {
    //         this.alertsService.openSweetalert('error', err?.message);
    //       }
    //       this.isLoading = false;
    //     });
    // }
    this.cdr.detectChanges();
  }
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
