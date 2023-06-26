import { patterns } from './../../../shared/TS Files/patternValidation';
import { CheckValidityService } from './../../../../services/check-validity.service';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { PolicyService } from '../../services/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-policy',
  templateUrl: './add-edit-policy.component.html',
  styleUrls: ['./add-edit-policy.component.scss'],
  providers: [DialogService]
})
export class AddEditPolicyComponent implements OnInit {
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
  SearchCountryField: any = SearchCountryField;
  CountryISO: any = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  imageNameString: string = '';
  isEditImage: boolean = false;
  showImage: boolean = false;
  imageName: string = '';

  imagePassportNameString: string = '';
  isEditPassportImage: boolean = false;
  showPassportImage: boolean = false;
  passportImageName: string = '';
  imageFile: any;
  imagePassportFile: any;
  payNow: boolean = false;

  genders: any = [
    { title: this.publicService?.translateTextFromJson('general.male'), value: 'male' },
    { title: this.publicService?.translateTextFromJson('general.female'), value: 'female' },
  ];

  constructor(
    private checkValidityService: CheckValidityService,
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    private fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.policyId = this.activatedRoute?.snapshot?.params['id'];
    this.getPolicyFormData();
    const today = new Date();
    this.maxDob = new Date(today.getFullYear() - this.minAge, today.getMonth(), today.getDate());

    if (!this.isEdit) {
      this.personalInfoForm?.patchValue({
        birthdate: this.maxDob
      })
    }
  }

  personalInfoForm = this.fb?.group({
    policy_id: ['', []],
    name: ['', {
      validators: [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)], updateOn: 'blur'
    }],
    birthdate: ['', [Validators.required]],
    email: ['', {
      validators: [Validators.required, Validators.pattern(patterns?.email)], updateOn: 'blur'
    }],
    profile_image: [null, []],
    nationality: [null, Validators.required],
    gender: [null, [Validators.required]],
    address: ['', {
      validators: [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)], updateOn: 'blur'
    }],
  });
  get formControls(): any {
    return this.personalInfoForm?.controls;
  }

  policyForm = this.fb?.group({
    start_date: ["", [Validators.required]],
    phone: [null, {
      validators: [Validators.required], updateOn: 'blur'
    }],
    alt_phone: [null, {
      validators: [], updateOn: 'blur'
    }],
    duration: ['', {
      validators: [Validators.required], updateOn: 'blur'
    }],
    passport_image: [null, [Validators.required]],
    pass_num: [null, {
      validators: [Validators.required, Validators.pattern(/[0-9]/), Validators.pattern(/[a-zA-Z]/), Validators.pattern(/^[a-zA-Z0-9]*$/)], updateOn: 'blur'
    }],
    duration_type: ['', [Validators.required]],
    job: [null, [Validators.required]],

  });
  get policyFormControls(): any {
    return this.policyForm?.controls;
  }

  medicalForm = this.fb?.group({
    virus_c: [null, [Validators.required]],
    virus_corona: [null, [Validators.required]],
    suffer: [null, [Validators.required]],
    poor_hearing: [null, [Validators.required]],
  });
  get medicalFormControls(): any {
    return this.medicalForm?.controls;
  }

  goBack(stepper: MatStepper): void {
    if (stepper?.selectedIndex == 0) {
      this.router?.navigate(['/policies/list']);
    } else {
      stepper?.previous();
    }
  }
  goForward(stepper: MatStepper): void {
    if (stepper?.selectedIndex == 0) {
      if (this.personalInfoForm?.valid) {
        stepper?.next();
      } else {
        this.checkValidityService?.validateAllFormFields(this.personalInfoForm);
      }
    }
    else if (stepper?.selectedIndex == 1) {
      if (this.policyForm?.valid) {
        stepper?.next();
      } else {
        this.checkValidityService?.validateAllFormFields(this.policyForm);
      }
    }
    else if (stepper?.selectedIndex == 2) {
      if (this.medicalForm?.valid) {
        stepper?.next();
      } else {
        this.checkValidityService?.validateAllFormFields(this.medicalForm);
      }
    }
  }

  getPolicyFormData(): void {
    this.policyId ? this.isLoading = true : '';
    this.policyService?.getPolicyFormData()?.subscribe(
      (res: any) => {
        if (res?.code == "200") {
          this.pageData = res?.data;
          if (this.policyId) {
            this.isEdit = true;
            this.personalInfoForm?.controls['policy_id']?.disable();
            this.getPolicyData(this.policyId);
          } else {
            this.isLoading = false;
          }
        } else {
          res?.message ? this.alertsService?.openSweetAlert("info", res?.message) : '';
          this.isLoading = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert("error", err?.message) : '';
        this.isLoading = false;
      }
    );
  }

  getPolicyData(id: any): void {
    this.policyService?.getPolicyById(id)?.subscribe(
      (res: any) => {
        if (res?.code == "200") {
          this.isLoading = false;
          this.policyData = res?.data;
          if (res?.data?.payment_status == '0') {
            this.payNow = true;
          } else {
            this.payNow = false;
          }
          let birth: any = moment(
            this.policyData?.birth_date,
            "yyyy-MM-dd"
          ).toDate();
          let start: any = moment(
            this.policyData?.start_date,
            "yyyy-MM-dd"
          ).toDate();
          let gender: any = { value: this.policyData?.gender };
          this.personalInfoForm?.patchValue({
            policy_id: this.policyData?.id,
            name: this.policyData?.name,
            birthdate: birth,
            email: this.policyData?.email,
            gender: gender,
            address: this.policyData?.address,
          });
          this.isEditImage = true;
          this.showImage = true;
          this.imageNameString = this.policyData?.image;
          this.imageName = this.policyData?.image;

          this.isEditPassportImage = true;
          this.showPassportImage = true;
          this.imagePassportNameString = this.policyData?.passport_photo;
          this.passportImageName = this.policyData?.passport_photo;

          this.pageData?.countries?.forEach((item: any) => {
            if (item?.id == this.policyData?.country_id) {
              this.personalInfoForm?.patchValue({
                nationality: item,
              });
            }
          });
          this.pageData?.jobs?.forEach((item: any) => {
            if (item?.id == this.policyData?.job_id) {
              this.policyForm?.patchValue({
                job: item,
              });
            }
          });
          console.log(this.policyData?.alternative_phone);

          this.policyForm?.patchValue({
            start_date: start,
            phone: this.policyData?.phone_number,
            alt_phone: this.policyData?.alternative_phone,
            duration: this.policyData?.duration,
            duration_type: this.policyData?.duration_type,
            pass_num: this.policyData?.passport_number,
            passport_image: this.policyData?.passport_photo
          });
          this.medicalForm?.patchValue({
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

  uploadImage(event: any): void {
    this.policyId ? this.imageName = event?.image : this.imageNameString = event?.image;
  }
  uploadPassportImage(event: any): void {
    this.policyId ? this.passportImageName = event?.image : this.imagePassportNameString = event?.image;
  }
  uploadFile(event: any): void {
    this.imageFile = event;
  }
  uploadPassportFile(event: any): void {
    this.imagePassportFile = event;
    this.policyForm?.patchValue({
      passport_image: event
    })
  }
  submit(stepper: MatStepper): void {
    if (this.medicalForm?.valid) {
      this.isLoadingBtn = true;
      this.publicService?.show_loader?.next(true);
      let formValue: any = this.policyForm?.value;
      let personalInfoValue: any = this.personalInfoForm?.value;
      let medicalFormValue: any = this.medicalForm?.value;
      let formData = new FormData();
      formData.append("name", personalInfoValue?.name);
      formData.append("email", personalInfoValue?.email);
      formData.append("address", personalInfoValue?.address);
      this.imageFile ? formData.append("image", this.imageFile) : '';
      formData.append("phone_number[number]", formValue?.phone?.number);
      formData.append("phone_number[dialCode]", formValue?.phone?.dialCode);
      formData.append("phone_number[countryCode]", formValue?.phone?.countryCode);
      formData.append("phone_number[e164Number]", formValue?.phone?.e164Number);
      formData.append("phone_number[internationalNumber]", formValue?.phone?.internationalNumber);
      formData.append("phone_number[nationalNumber]", formValue?.phone?.nationalNumber);
      formData.append("alternative_phone[number]", formValue?.alt_phone?.number);
      formData.append("alternative_phone[dialCode]", formValue?.alt_phone?.dialCode);
      formData.append("alternative_phone[countryCode]", formValue?.alt_phone?.countryCode);
      formData.append("alternative_phone[e164Number]", formValue?.alt_phone?.e164Number);
      formData.append("alternative_phone[internationalNumber]", formValue?.alt_phone?.internationalNumber);
      formData.append("alternative_phone[nationalNumber]", formValue?.alt_phone?.nationalNumber);
      formData.append("gender", personalInfoValue?.gender?.value);
      formData.append("passport_number", formValue?.pass_num);
      let start_date: any = this.datePipe.transform(formValue?.start_date, "yyyy-MM-dd");
      formData.append("start_date", start_date);
      let birthDate: any = this.datePipe.transform(personalInfoValue?.birthdate, "yyyy-MM-dd");
      formData.append("birth_date", birthDate);
      formData.append("job_id", formValue?.job?.id);
      formData.append("duration_type", formValue?.duration_type);
      formData.append("duration", formValue?.duration);
      this.imagePassportFile ? formData.append("passport_photo", this.imagePassportFile) : '';
      formData.append("c_virus", medicalFormValue?.virus_c);
      formData.append("corona_virus", medicalFormValue?.virus_corona);
      formData.append("deficiency_part_of_body", medicalFormValue?.suffer);
      formData.append("chronic_disease", medicalFormValue?.poor_hearing);
      formData.append("country_id", personalInfoValue?.nationality?.id);
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
              this.policyData = res?.data;
              if (res?.data?.policy?.payment_status == '0') {
                this.payNow = true;
              } else {
                this.payNow = true;
              }
              stepper.next();
              this.isLoadingBtn = false;
              this.publicService?.show_loader?.next(false);
            } else {
              this.alertsService?.openSweetAlert('info', res?.message);
              this.isLoadingBtn = false;
              this.publicService?.show_loader?.next(false);
            }
          },
          (err) => {
            if (err?.message) {
              this.alertsService?.openSweetAlert('error', err?.message);
            }
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          });
      } else {
        this.policyService?.addPolicy(formData)?.subscribe(
          (res: any) => {
            if (res?.code == "200") {
              this.policyData = res?.data;
              this.policyId = res?.data?.id;
              if (res?.data?.policy?.payment_status == '0') {
                this.payNow = true;
              } else {
                this.payNow = false;
              }
              stepper.next();
              this.isLoadingBtn = false;
              this.publicService?.show_loader?.next(false);
            } else {
              this.alertsService?.openSweetAlert('info', res?.message);
              this.isLoadingBtn = false;
              this.publicService?.show_loader?.next(false);
            }
          },
          (err) => {
            if (err?.message) {
              this.alertsService?.openSweetAlert('error', err?.message);
            }
            this.isLoadingBtn = false;
            this.publicService?.show_loader?.next(false);
          });
      }
      this.cdr?.detectChanges();
    } else {
      this.checkValidityService?.validateAllFormFields(this.medicalForm);
    }
  }

  payNowItem(data: any): void {
    this.router?.navigate(['/policies/checkout', { data: JSON.stringify(data?.policy), paymentOrder: JSON.stringify(data?.payment), isEdit: this.isEdit }]);
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
