import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          title: 'titles.home',
          type: 'home'
        }
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'titles.aboutUs',
          type: 'home'
        }
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: {
          title: 'titles.pricing',
          type: 'home'
        }
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'titles.contactUs',
          type: 'home'
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/profile/profile.module')
          .then(m => m.ProfileModule)
      },
      { path: 'payments', loadChildren: () => import('../../modules/payments/payments.module').then(m => m.PaymentsModule) },
      {
        path: 'policies',
        loadChildren: () => import('../../modules/policies/policies.module')
          .then(m => m.PoliciesModule)
      },
      { path: 'statistics', loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule) },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
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
export class HomeRoutingModule { }
