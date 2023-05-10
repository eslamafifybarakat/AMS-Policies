import { AlertsService } from './../../../../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../../../../services/public.service';
import { keys } from './../../../../../../shared/TS Files/localstorage-key';
import { PaymentService } from './../../../../../services/payment.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {
  policyId: any;

  constructor(
    private alertsService: AlertsService,
    private paymentService: PaymentService,
    private publicService: PublicService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.policyId = window.localStorage.getItem(keys?.policyPayId);
  }

  backTo(url: string): void {
    this.publicService?.show_loader?.next(true);
    this.paymentService?.checkPaymentStatus(this.policyId)?.subscribe(
      (res) => {
        if (res?.code == "200") {
          console.log(res?.data);
          this.router.navigate([url]);
          this.alertsService?.openSweetAlert("info", res?.message);
          this.publicService?.show_loader?.next(false);
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.publicService?.show_loader?.next(false);
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.publicService?.show_loader?.next(false);
      }
    );
  }

}
