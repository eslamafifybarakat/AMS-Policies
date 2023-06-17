import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule) },
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
        redirectTo: "",
        pathMatch: "full",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
