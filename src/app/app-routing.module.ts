import { PaymentResultComponent } from './modules/policies/components/policies/new-policy/checkout/payment-result/payment-result.component';
import { AuthGuard } from './modules/shared/services/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/layout/layout.module')
      .then(m => m.LayoutModule)
  },

  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module')
      .then(m => m.ErrorModule)
  },

  { path: "**", redirectTo: "error" }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        scrollPositionRestoration: 'top',
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
