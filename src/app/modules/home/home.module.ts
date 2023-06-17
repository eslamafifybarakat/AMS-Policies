import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { SharedModule } from '../shared/modules/shared.module';
import { VideoModalComponent } from './components/home-page/components/video-modal/video-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    AboutUsComponent,
    ContactUsComponent,
    PricingComponent,
    VideoModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
