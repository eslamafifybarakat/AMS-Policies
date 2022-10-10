import { SharedModule } from './../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PolicyDashboardComponent } from './components/policy-dashboard/policy-dashboard.component';
import { PoliciesListComponent } from './components/policies-list/policies-list.component';
import { PaymentsComponent } from './components/payments/payments.component';


@NgModule({
  declarations: [
    PoliciesComponent,
    PolicyDashboardComponent,
    PoliciesListComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule
  ]
})
export class PoliciesModule { }
