import { SharedModule } from './../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PolicyDashboardComponent } from './components/policy-dashboard/policy-dashboard.component';
import { PoliciesListComponent } from './components/policies/policies-list/policies-list.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PolicyDataComponent } from './components/policies/new-policy/policy-data/policy-data.component';


@NgModule({
  declarations: [
    PoliciesComponent,
    PolicyDashboardComponent,
    PoliciesListComponent,
    PaymentsComponent,
    PolicyDataComponent,
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule
  ]
})
export class PoliciesModule { }
