import { MatDialog } from '@angular/material/dialog';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
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
  data: any = {
    video_link: 'https://v4.cdnpk.net/videvo_files/video/free/video0466/large_watermarked/_import_614eddf5b968a8.24723971_FPpreview.mp4',
    thumbnail_image: '../../../assets/image/home/slider2.jpg'
  };
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    Aos.init({
    });
  }
  openVideo(): void {
    this.dialog.open(VideoModalComponent, {
      width: "40%",
      data: {
        url_video: this.data?.video_link,
        image_video: this.data?.thumbnail_image,
      }
    });
  }
}
