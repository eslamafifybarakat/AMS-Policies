import { DeactiveComponent } from './components/personal-info/deactive/deactive.component';
import { SharedModule } from '../shared/modules/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    DeactiveComponent

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ImageCropperModule,
    SharedModule,
    ImageCropperModule,
  ]
})
export class ProfileModule { }
