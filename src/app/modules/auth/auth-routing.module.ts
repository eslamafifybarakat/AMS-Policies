import { VerfiyPasswordComponent } from './components/verfiy-password/verfiy-password.component';
import { ConfirmLoginCodeComponent } from './components/confirm-login-code/confirm-login-code.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LogInComponent,
        data: {
          title: 'titles.login',
          type: 'auth'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'titles.register',
          type: 'auth'
        }
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        data: {
          title: 'titles.forget_password',
          type: 'auth'
        }
      },
      {
        path: 'new-password',
        component: NewPasswordComponent,
        data: {
          title: 'titles.new_password',
          type: 'auth'
        }
      },
      {
        path: 'confirm-login-code',
        component: ConfirmLoginCodeComponent,
        data: {
          title: 'titles.confirmLoginCode',
          type: 'auth'
        }
      },
      {
        path: 'email-verification',
        component: VerfiyPasswordComponent,
        data: {
          title: 'titles.emailVerification',
          type: 'auth'
        }
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
