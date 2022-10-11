import { LyDialog } from '@alyle/ui/dialog';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StyleRenderer, ThemeVariables, lyl } from '@alyle/ui';
import { ImgCropperEvent } from "@alyle/ui/image-cropper";
import { AuthUserService } from '../auth/services/auth-user.service';
import { CropperImageDialogComponent } from '../shared/component/cropper-image-dialog/cropper-image-dialog.component';
import { PublicService } from '../../services/public.service';

const STYLES = (theme: ThemeVariables) => ({
  $global: lyl`{
    body {
      background-color: ${theme.background.default}
      color: ${theme.text.default}
      font-family: ${theme.typography.fontFamily}
      margin: 0
      direction: ${theme.direction}
    }
  }`,
  root: lyl`{
    display: block
  }`
});
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    StyleRenderer
  ]
})

export class ProfileComponent implements OnInit {

  // link: any = 'https://www.linkedin.com/in/eslam-afify-barakat-3a1396142/';
  cropped?: string = "";
  profileImgSelected: boolean = false;
  isMaxImg: boolean = false;

  // followvalue: string = "Follow";
  readonly classes = this.sRenderer.renderSheet(STYLES, true);

  constructor(
    readonly publicService: PublicService,
    public _AuthUserser: AuthUserService,
    readonly sRenderer: StyleRenderer,
    readonly cdr: ChangeDetectorRef,
    private _dialog: LyDialog
  ) { }

  ngOnInit(): void {
  }

  // followChange(): void {
  //   if (this.followvalue == "Following") {
  //     this.followvalue = "Follow";
  //   } else {
  //     this.followvalue = "Following";
  //   }
  // }

  openCropperDialog(event: Event): void {
    this.cropped = null!;
    this._dialog
      .open<CropperImageDialogComponent, Event>(CropperImageDialogComponent, {
        data: event,
        width: "35%",
        disableClose: true,
      })
      .afterClosed.subscribe((result?: ImgCropperEvent) => {
        if (result) {
          this.cropped = result.dataURL;
          this.profileImgSelected = true;
          let img = this.publicService?.base64ToImageFile(
            this.cropped,
            "image"
          );
          if (img?.size <= 5120 * 1024) {
            this.isMaxImg = false;
          } else {
            this.cropped = "";
            this.profileImgSelected = false;
            this.cdr.markForCheck();
            this.isMaxImg = true;
          }

          this.cdr.markForCheck();
        }
      });
  }

  onRemoveImage(): void {
    this.cropped = "";
    if (this.cropped == "") {
      this.profileImgSelected = false;
    }
    this.cdr?.detectChanges();
  }

  signOut(): void {
    this._AuthUserser.signOut();
  }

}
