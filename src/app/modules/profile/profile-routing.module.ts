import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: PersonalInfoComponent,
        data: {
          title: 'titles.personal_info'
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        data: {
          title: 'titles.change_password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
