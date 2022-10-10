import { PagesComponent } from './pages.component';
import { SalesComponent } from './components/sales/sales.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'policies',
        loadChildren: () => import('../../modules/policies/policies.module')
          .then(m => m.PoliciesModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/profile/profile.module')
          .then(m => m.ProfileModule)
      },
      {
        path: "",
        redirectTo: "policies",
        pathMatch: "full",
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
