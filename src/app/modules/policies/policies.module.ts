import { CheckoutComponent } from './components/policies/new-policy/checkout/checkout.component';
import { SharedModule } from './../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PolicyDashboardComponent } from './components/policy-dashboard/policy-dashboard.component';
import { PoliciesListComponent } from './components/policies/policies-list/policies-list.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PolicyDataComponent } from './components/policies/new-policy/policy-data/policy-data.component';
import { PolicyPaymentDetailsModalComponent } from './components/payments/policy-payment-details-modal/policy-payment-details-modal.component';
import { WantToPayModalComponent } from './components/policies/new-policy/want-to-pay-modal/want-to-pay-modal.component';
import { PaymentResultComponent } from './components/policies/new-policy/checkout/payment-result/payment-result.component';
import { AddEditPolicyComponent } from './components/add-edit-policy/add-edit-policy.component';


@NgModule({
  declarations: [
    PoliciesComponent,
    PolicyDashboardComponent,
    PoliciesListComponent,
    PaymentsComponent,
    PolicyDataComponent,
    CheckoutComponent,
    PolicyPaymentDetailsModalComponent,
    WantToPayModalComponent,
    PaymentResultComponent,
    AddEditPolicyComponent
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule
  ]
})
export class PoliciesModule { }
