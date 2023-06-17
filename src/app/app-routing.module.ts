import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './modules/shared/services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentResultComponent } from './modules/policies/components/policies/new-policy/checkout/payment-result/payment-result.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'titles.home'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'titles.aboutUs'
    }
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: {
      title: 'titles.pricing'
    }
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: {
      title: 'titles.contactUs'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/layout/layout.module')
      .then(m => m.LayoutModule)
  },
  {
    path: 'auth',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'payment-result',
    canActivate: [AuthGuard],
    component: PaymentResultComponent,
    data: {
      title: 'titles.payments'
    }
  },
  {
    path: " ",
    redirectTo: "home",
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
