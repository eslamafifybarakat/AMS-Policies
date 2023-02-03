import { AlertsService } from './../shared/services/alerts/alerts.service';
import { LyDialog } from '@alyle/ui/dialog';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StyleRenderer, ThemeVariables, lyl } from '@alyle/ui';
import { ImgCropperEvent } from "@alyle/ui/image-cropper";
import { AuthUserService } from '../auth/services/auth-user.service';
import { CropperImageDialogComponent } from '../shared/component/cropper-image-dialog/cropper-image-dialog.component';
import { PublicService } from '../../services/public.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { keys } from '../shared/TS Files/localstorage-key';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    StyleRenderer
  ]
})

export class ProfileComponent implements OnInit {

  userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
  cropped?: string = "";
  profileImgSelected: boolean = false;
  isMaxImg: boolean = false;
  img: any = 'assets/image/userprofile.jpg'
  selectedFile: any = '';
  croppedImage: any = this.img;
  imageChangedEvent: any = '';
  showCrop: boolean = false;
  isLoadingBtn: boolean = false;

  constructor(
    public _AuthUserser: AuthUserService,
    private publicService: PublicService,
    public alertsService: AlertsService,
    public _AuthUser: AuthUserService,
    readonly sRenderer: StyleRenderer,
    readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.publicService.recallUserDataStorage.subscribe((res) => {
      if (res == true) {
        this.userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
        this.cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = event.target.files[0] ?? null;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = this.croppedImage;
    }
    reader.readAsDataURL(this.selectedFile)
    this.showCrop = true
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  ok(): void {
    this.publicService.show_loader.next(true);
    let formData = new FormData();
    formData.append('photo', this.selectedFile)
    this._AuthUser?.editProfile(formData)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          this.publicService.show_loader.next(false);
          this.publicService.recallUserDataFn.next(true);
          this.showCrop = false;
        } else {
          this.publicService.show_loader.next(false);
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.publicService.show_loader.next(false);
      }
    );
  }
  cancel(): void {
    this.showCrop = false
  }
  // save():void{
  //   this.isLoadingBtn=true
  //   setTimeout(() => {
  //     console.log(this.img);
  //     this.isLoadingBtn=false
  //   }, 1000);
  // }

  signOut(): void {
    this._AuthUserser.signOut();
  }

}
