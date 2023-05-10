import { AlertsService } from './../../../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../../../services/public.service';
import { PolicyService } from './../../../../services/policy.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { WantToPayModalComponent } from '../want-to-pay-modal/want-to-pay-modal.component';

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss'],
  providers: [DialogService]
})
export class PolicyDataComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;
  isLoadingBtn: boolean = false;

  isEdit: boolean = false;
  policyId: any = null;
  policyData: any = null;
  pageData: any = [];

  passportImageFile: File[] = [];
  profileImageFile: File[] = [];
  isMaxImage: boolean = false;
  isMaxProfileImage: boolean = false;

  todayDate: Date = new Date();
  readonly minAge = 18;
  maxDob: any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];


  constructor(
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    public datePipe: DatePipe,
    private fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.policyId = this.activatedRoute?.snapshot?.params['id'];
    this.getPloicyFormData();

    const today = new Date();
    this.maxDob = new Date(today.getFullYear() - this.minAge, today.getMonth(), today.getDate());
  }

  policyForm = this.fb.group({
    policy_id: ['', []],
    name: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    start_date: ["", [Validators.required]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    alt_phone: ['', []],
    duration: ['', [Validators.required]],
    passport_image: [null, []],
    profile_image: [null, []],
    pass_num: [null, [Validators.required, Validators.pattern(/[0-9]/), Validators.pattern(/[a-zA-Z]/), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
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

  getPloicyFormData(): void {
    this.policyId ? this.isLoading = true : '';
    this.policyService?.getPolicyFormData()?.subscribe(
      (res) => {
        if (res?.code == "200") {
          this.pageData = res?.data;
          if (this.policyId) {
            this.isEdit = true;
            this.policyForm.controls['policy_id'].disable();
            this.getPloicyData(this.policyId);
          } else {
            this.isLoading = false;
          }
        } else {
          res?.message ? this.alertsService?.openSweetAlert("info", res?.message) : '';
          this.isLoading = false;
        }
      },
      (err) => {
        err?.message ? this.alertsService?.openSweetAlert("error", err?.message) : '';
        this.isLoading = false;
      }
    );
  }

  getPloicyData(id: any): void {
    this.policyService?.getPolicyById(id)?.subscribe(
      (res) => {
        if (res?.code == "200") {
          this.isLoading = false;
          this.policyData = res?.data;
          console.log(this.policyData);
          let birth: any = moment(
            this.policyData?.birth_date,
            "yyyy-MM-dd"
          ).toDate();
          let start: any = moment(
            this.policyData?.start_date,
            "yyyy-MM-dd"
          ).toDate();


          this.policyForm?.patchValue({
            policy_id: this.policyData?.id,
            name: this.policyData?.name,
            start_date: start,
            birthdate: birth,
            email: this.policyData?.email,
            gender: this.policyData?.gender,
            phone: this.policyData?.phone_number,
            alt_phone: this.policyData?.alternative_phone,
            duration: this.policyData?.duration,
            duration_type: this.policyData?.duration_type,
            job: this.policyData?.job_id,
            nationality: this.policyData?.country_id,
            address: this.policyData?.address,
            pass_num: this.policyData?.passport_number,
            virus_c: this.policyData?.c_virus,
            virus_corona: this.policyData?.corona_virus,
            suffer: this.policyData?.deficiency_part_of_body,
            poor_hearing: this.policyData?.chronic_disease
          });
        } else {
          this.isLoading = false;
          res?.message ? this.alertsService?.openSweetAlert("info", res?.message) : '';
        }
      },
      (err) => {
        err?.message ? this.alertsService?.openSweetAlert("error", err?.message) : '';
        this.isLoading = false;
      }
    );
  }

  passportImageFileChangeEvent(event: any): void {
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

  profileImageFileChangeEvent(event: any): void {
    if (event?.target?.files[0]?.size <= 5120 * 1024) {
      this.isMaxProfileImage = false;
      this.profileImageFile[0] = event?.target?.files[0];
    } else {
      this.isMaxProfileImage = true;
    }
  }
  onRemoveProfileImage(name: any): void {
    this.profileImageFile = this.profileImageFile?.filter((value: any) => {
      return value?.name !== name;
    });
    this.policyForm?.get('profile_image')?.reset();
    this.cdr.detectChanges();
  }

  submit(): void {
    this.isLoadingBtn = true;
    this.publicService?.show_loader?.next(true);
    let formValue: any = this.policyForm?.value;
    let formData = new FormData();
    console.log(formValue?.name);
    console.log(formValue?.phone);
    formData.append("name", formValue?.name);
    formData.append("email", formValue?.email);
    formData.append("address", formValue?.address);
    this.profileImageFile[0] ? formData.append("image", this.profileImageFile[0]) : '';

    formData.append("phone_number[number]", formValue?.phone?.number);
    formData.append("phone_number[dialCode]", formValue?.phone?.dialCode);
    formData.append("phone_number[countryCode]", formValue?.phone?.countryCode);
    formData.append("phone_number[e164Number]", formValue?.phone?.e164Number);
    formData.append("phone_number[internationalNumber]", formValue?.phone?.internationalNumber);
    formData.append("phone_number[nationalNumber]", formValue?.phone?.nationalNumber);
    formData.append("alternative_phone[number]", formValue?.alt_phone?.number);
    formData.append("alternative_phone[dialCode]", formValue?.alt_phone?.dialCode);
    formData.append("alternative_phone[countryCode]", formValue?.phone?.countryCode);
    formData.append("alternative_phone[e164Number]", formValue?.phone?.e164Number);
    formData.append("alternative_phone[internationalNumber]", formValue?.phone?.internationalNumber);
    formData.append("alternative_phone[nationalNumber]", formValue?.phone?.nationalNumber);
    formData.append("gender", formValue?.gender);
    formData.append("passport_number", formValue?.pass_num);
    let start_date: any = this.datePipe.transform(formValue?.start_date, "yyyy-MM-dd");
    formData.append("start_date", start_date);
    let birthDate: any = this.datePipe.transform(formValue?.birthdate, "yyyy-MM-dd");
    formData.append("birth_date", birthDate);
    formData.append("job_id", formValue?.job);

    formData.append("duration_type", formValue?.duration_type);
    formData.append("duration", formValue?.duration);
    this.passportImageFile[0] ? formData.append("passport_photo", this.passportImageFile[0]) : '';
    formData.append("c_virus", formValue?.virus_c);
    formData.append("corona_virus", formValue?.virus_corona);
    formData.append("deficiency_part_of_body", formValue?.suffer);
    formData.append("chronic_disease", formValue?.poor_hearing);
    formData.append("country_id", formValue?.nationality);
    formData.append(
      "phone",
      formValue?.phone_number?.number.replace(
        formValue?.phone_number?.dialCode,
        ""
      )
    );
    formData.append("phone_code", formValue?.phone_number?.dialCode);
    if (this.policyId) {

      this.policyService?.updatePolicy(formData, this.policyId)?.subscribe(
        (res: any) => {
          if (res?.code === "200") {
            if (res?.data?.policy?.payment_status == '0') {
              const ref = this.dialogService?.open(WantToPayModalComponent, {
                dismissableMask: false,
                closable: false,
                width: '45%',
                styleClass: 'pay-modal'
              });
              ref.onClose.subscribe((resModal: any) => {
                this.alertsService.openSweetAlert('success', res?.message);
                if (resModal?.list) {
                  this.router.navigate(['/home/policies/list', { data: JSON.stringify(this.policyForm?.value), isEdit: this.isEdit }]);
                }
                if (resModal?.payment) {
                  this.router.navigate(['/home/policies/checkout', { data: JSON.stringify(res?.data?.policy), paymentOrder: JSON.stringify(res?.data?.payment), isEdit: this.isEdit }]);
                }
              });
            } else {
              this.alertsService.openSweetAlert('success', res?.message);
              this.router.navigate(['/home/policies/list', { data: JSON.stringify(this.policyForm?.value), isEdit: this.isEdit }]);
            }
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          } else {
            this.alertsService.openSweetAlert('info', res?.message);
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          }
        },
        (err) => {
          if (err?.message) {
            this.alertsService.openSweetAlert('error', err?.message);
          }
          this.isLoadingBtn = false;
          this.publicService?.show_loader?.next(false);
        });
    } else {
      this.policyService?.addPolicy(formData)?.subscribe(
        (res: any) => {
          if (res?.code === "200") {
            this.alertsService.openSweetAlert('success', res?.message);
            this.router.navigate(['/home/policies/checkout', { data: JSON.stringify(this.policyForm?.value), isEdit: this.isEdit }]);
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          } else {
            this.alertsService.openSweetAlert('info', res?.message);
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          }
        },
        (err) => {
          if (err?.message) {
            this.alertsService.openSweetAlert('error', err?.message);
          }
          this.isLoadingBtn = false;
          this.publicService?.show_loader?.next(false);
        });
    }
    this.cdr.detectChanges();
  }
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
