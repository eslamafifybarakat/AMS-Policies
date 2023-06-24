import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentsComponent } from './payments.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '', component: PaymentsComponent, children: [
    {
      path: 'list',
      component: PaymentsListComponent,
      data: {
        title: 'titles.payments',
        type: 'payments'
      }
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'error',
      loadChildren: () => import('./../../modules/error/error.module')
        .then(m => m.ErrorModule)
    },
    { path: "**", redirectTo: "error" }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
