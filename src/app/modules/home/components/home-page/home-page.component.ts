import { AuthUserService } from './../../../auth/services/auth-user.service';
import { patterns } from './../../../shared/TS Files/patternValidation';
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
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  homeData: any;
  currentLanguage: any;
  activeIndex1: any = 0;
  isLoggedIn: boolean = false;

  constructor(
    private authUserService: AuthUserService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) { }
  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(patterns?.email)]]
  })
  ngOnInit(): void {
    this.isLoggedIn = this.authUserService?.isLoggedIn();
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    Aos.init();
    this.homeData = JSON?.parse(localStorage?.getItem(keys?.homeData) || '');
    this.publicService?.loadingHomeData?.subscribe((res: any) => {
      if (res == true) {
        this.publicService?.show_loader?.next(true);
      }
    })
  }

  // getHomeData(): void {
  //   this.publicService?.show_loader?.next(true);
  //   this.homeService?.getHomeData()?.subscribe(
  //     (res: any) => {
  //       if (res?.code == "200") {
  //         this.homeData = res?.data;
  //         this.publicService?.show_loader?.next(false);
  //       } else {
  //         res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
  //         this.publicService?.show_loader?.next(false);
  //       }
  //     },
  //     (err: any) => {
  //       err ? this.alertsService?.openSweetAlert('error', err) : '';
  //       this.publicService?.show_loader?.next(false);
  //     }
  //   )
  //   // this.homeData = this.currentLanguage == 'ar' ? homeDataAr : homeDataEn;


  // }

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
  onClickTab(tab: any): void {
    console.log(tab);

  }
  submit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
