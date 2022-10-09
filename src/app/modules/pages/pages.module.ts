import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SalesComponent } from './components/sales/sales.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AboutComponent,
    SalesComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatStepperModule,

    MatPaginatorModule
  ]
})
export class PagesModule { }
