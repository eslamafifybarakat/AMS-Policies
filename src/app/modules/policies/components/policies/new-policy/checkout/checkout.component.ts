// import { PolicyService } from 'src/app/modules/policies/services/policy.service';
import { AlertsService } from './../../../../../shared/services/alerts/alerts.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;

  policyData: any;

  filterValue: any = '';

  constructor(
    // private policyService: PolicyService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.policyData = JSON.parse(this.activatedRoute?.snapshot?.params['data'] || '{}');
    this.isEdit = this.activatedRoute?.snapshot?.params['isEdit'];
    console.log(this.policyData, this.isEdit);
  }

  submit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home/policies/list']);
    }, 2000);
  }

  // onSubmit(): void {
  //   this.isLoading = true;

  //   let policyDataObj: any;
  //   policyDataObj = {
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
  //   this.policyService?.addPolicy(policyDataObj)?.subscribe(
  //     (res: any) => {
  //       if (res?.code === 200) {
  //         this.alertsService.openSweetAlert('success', res?.message);
  //         this.router.navigate(['/home/policies/list']);
  //         this.isLoading = false;
  //       } else {
  //         this.alertsService.openSweetAlert('info', res?.message);
  //         this.isLoading = false;
  //       }
  //     },
  //     (err) => {
  //       if (err?.message) {
  //         this.alertsService.openSweetAlert('error', err?.message);
  //       }
  //       this.isLoading = false;
  //     });

  //   this.cdr.detectChanges();
  // }

  check(type: any): void {
    if (type !== this.filterValue) {
      this.filterValue = type;
    } else {
      this.filterValue = '';
    }
    console.log(this.filterValue);
    this.cdr.detectChanges();
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
