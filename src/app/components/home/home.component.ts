import { AlertsService } from './../../modules/shared/services/alerts/alerts.service';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { PublicService } from './../../services/public.service';
import { HomeService } from './../../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  homeData: any;

  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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

    this.homeData = {
      "title": "dummy.title",
      "description": "dummy.desc",
      "videoLink": "../../../assets/image/videos/policy.mp4",
      "thumbnailImage": "../../../assets/image/home/slider2.jpg",
      "featureTitle": "dummy.title",
      "features": [
        {
          "title": "dummy.features.euroClub",
          "description": "dummy.features.clubWorks"
        },
        {
          "title": "dummy.features.travel",
          "description": "dummy.features.travelAssistance"
        },
        {
          "title": "dummy.features.euroConsulting",
          "description": "dummy.features.euroConsultingSpecial"
        }
      ]
    };

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
