import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotifcationComponent } from './components/header/notifcation/notifcation.component';
import { SearchComponent } from './components/header/search/search.component';
import { ThemeComponent } from './components/header/theme/theme.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TopHeaderComponent,
    FooterComponent,
    NotifcationComponent,
    UserInfoComponent,
    HeaderComponent,
    ThemeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ClickOutsideModule,


  ]
})
export class LayoutModule { }
