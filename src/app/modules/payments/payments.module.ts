import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { SharedModule } from '../shared/modules/shared.module';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
