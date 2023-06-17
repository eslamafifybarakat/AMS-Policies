import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotifcationComponent } from './components/header/notifcation/notifcation.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NotifcationComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ClickOutsideModule,
  ]
})
export class LayoutModule { }
