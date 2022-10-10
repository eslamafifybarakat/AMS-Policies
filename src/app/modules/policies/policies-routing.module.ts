import { PoliciesListComponent } from './components/policies-list/policies-list.component';
import { PolicyDashboardComponent } from './components/policy-dashboard/policy-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies.component';
import { PaymentsComponent } from './components/payments/payments.component';

const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: PolicyDashboardComponent,
        data: {
          title: 'titles.dashboard'
        }
      },
      {
        path: 'list',
        component: PoliciesListComponent,
        data: {
          title: 'titles.policies'
        }
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: {
          title: 'titles.payments'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
