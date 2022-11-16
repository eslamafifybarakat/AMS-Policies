import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmLoginCodeComponent } from './components/confirm-login-code/confirm-login-code.component';
import { ForgrtPasswordComponent } from './components/forgrt-password/forgrt-password.component';
import { LogInComponent } from './components/login/login.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegisterComponent } from './components/register/register.component';
import { VerfiyPasswordComponent } from './components/verfiy-password/verfiy-password.component';

import { CodeInputModule } from 'angular-code-input';

@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterComponent,
    ForgrtPasswordComponent,
    VerfiyPasswordComponent,
    NewPasswordComponent,
    ConfirmLoginCodeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxIntlTelInputModule,
    CodeInputModule
  ]

})
export class AuthModule { }
