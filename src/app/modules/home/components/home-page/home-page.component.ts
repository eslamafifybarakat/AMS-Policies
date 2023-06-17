import { homeDataAr, homeDataEn } from './../../../../ams-policy-data/home-data';
import { AlertsService } from './../../../../modules/shared/services/alerts/alerts.service';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { PublicService } from '../../../../services/public.service';
import { HomeService } from './../../../../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Aos from 'aos';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  homeData: any;
  currentLanguage: any;

  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    Aos.init();
    this.getHomeData();
  }

  getHomeData(): void {
    // this.publicService?.show_loader?.next(true);
    // this.homeService?.getHomeData()?.subscribe(
    //   (res: any) => {
    //     if (res?.success == true) {
    //       this.homeData = res;
    //       this.publicService?.show_loader?.next(false);
    //     } else {
    //       res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //       this.publicService?.show_loader?.next(false);
    //     }
    //   },
    //   (err: any) => {
    //     err ? this.alertsService?.openSweetAlert('error', err) : '';
    //     this.publicService?.show_loader?.next(false);
    //   }
    // )
    this.homeData = this.currentLanguage == 'ar' ? homeDataAr : homeDataEn;


  }

  openVideo(): void {
    this.dialog.open(VideoModalComponent, {
      width: "90%",
      panelClass: 'video-dialog',
      data: {
        url_video: this.homeData?.videoLink,
        image_video: this.homeData?.thumbnailImage,
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
