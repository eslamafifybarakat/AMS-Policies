import { DeactiveComponent } from './components/personal-info/deactive/deactive.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailSettingComponent } from './components/email-setting/email-setting.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    EmailSettingComponent,
    DeactiveComponent

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ImageCropperModule,
    SharedModule

  ]
})
export class ProfileModule { }
