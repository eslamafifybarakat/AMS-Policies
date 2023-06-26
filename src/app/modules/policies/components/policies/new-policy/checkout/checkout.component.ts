import { keys } from './../../../../../shared/TS Files/localstorage-key';
import { PaymentService } from './../../../../services/payment.service';
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
  paymentOrder: any;

  constructor(
    // private policyService: PolicyService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private paymentService: PaymentService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.policyData = JSON.parse(this.activatedRoute?.snapshot?.params['data'] || '{}');
    this.isEdit = this.activatedRoute?.snapshot?.params['isEdit'];

    this.paymentOrder = JSON.parse(this.activatedRoute?.snapshot?.params['paymentOrder'] || '{}');
    console.log(this.policyData);
    console.log(this.isEdit);
    console.log(this.paymentOrder);

  }

  submit(): void {
    this.isLoading = true;
    this.paymentService?.payNow(this.policyData?.id)?.subscribe(
      (res) => {
        if (res?.code == "200") {
          console.log(res?.data);
          let url = res?.data?.payment_url;
          window.open(url, "_self");
          window.localStorage.setItem(keys?.policyPayId, this.policyData?.id);
          this.isLoading = false;
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
      }
    );
    this.cdr?.detectChanges();
  }

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
