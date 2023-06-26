import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { SharedModule } from '../shared/modules/shared.module';


@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsPageComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule
  ]
})
export class StatisticsModule { }
