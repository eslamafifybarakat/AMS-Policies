import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AuthGuard } from '../shared/services/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: PersonalInfoComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'titles.personal_info',
          type: 'profile'
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'titles.change_password',
          type: 'profile'
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
export class ProfileRoutingModule { }
