
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgrtPasswordComponent } from './components/forgrt-password/forgrt-password.component';
import { LogInComponent } from './components/login/login.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    data: {
      title: 'titles.login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'titles.register'
    }
  },
  {
    path: 'forget-password',
    component: ForgrtPasswordComponent,
    data: {
      title: 'titles.forget_password'
    }
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
    data: {
      title: 'titles.new_password'
    }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
