import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'home',
        component: HomePageComponent,
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
