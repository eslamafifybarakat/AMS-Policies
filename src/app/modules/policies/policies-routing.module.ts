import { CheckoutComponent } from './components/policies/new-policy/checkout/checkout.component';
import { PolicyDataComponent } from './components/policies/new-policy/policy-data/policy-data.component';
import { PoliciesListComponent } from './components/policies/policies-list/policies-list.component';
import { PolicyDashboardComponent } from './components/policy-dashboard/policy-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AddEditPolicyComponent } from './components/add-edit-policy/add-edit-policy.component';
import { AuthGuard } from '../shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: PoliciesListComponent,
        data: {
          title: 'titles.policies',
          type: 'policies'
        }
      },
      {
        path: 'add-edit-policy',
        canActivate: [AuthGuard],
        component: AddEditPolicyComponent,
        data: {
          title: 'titles.policy_data',
          type: 'policies'
        }
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent,
        data: {
          title: 'titles.checkout',
          type: 'policies'
        }
      },
      {
        path: 'error',
        loadChildren: () => import('./../../modules/error/error.module')
          .then(m => m.ErrorModule)
      },
      { path: "**", redirectTo: "error" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
