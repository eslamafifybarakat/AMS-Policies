import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit {
  @ViewChild("videoPlayer") videoplayer: ElementRef | undefined;
  url: any = '';
  isPlay: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.url = this.data?.url_video;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  playVideo(): void {
    this.isPlay = true;
    this.videoplayer?.nativeElement.play();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
