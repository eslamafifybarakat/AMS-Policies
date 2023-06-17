import { AlertsService } from './../../modules/shared/services/alerts/alerts.service';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { PublicService } from './../../services/public.service';
import { HomeService } from './../../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedText: string = "";
  items: any = [9, 4, 4]
  responsiveOptions = [
    {
      breakpoint: '1440px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
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
      "videoLink": "https://v4.cdnpk.net/videvo_files/video/free/video0466/large_watermarked/_import_614eddf5b968a8.24723971_FPpreview.mp4",
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
}
