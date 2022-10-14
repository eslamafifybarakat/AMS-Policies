import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { FooterComponent } from './components/footer/footer.component';
import { NotifcationComponent } from './components/header/notifcation/notifcation.component';
import { ThemeComponent } from './components/header/theme/theme.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NotifcationComponent,
    UserInfoComponent,
    HeaderComponent,
    ThemeComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ClickOutsideModule,


  ]
})
export class LayoutModule { }
