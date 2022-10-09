import {
  StyleRenderer,
  WithStyles,
  lyl,
  ThemeRef,
  ThemeVariables,
} from "@alyle/ui";
import { LyDialogRef, LY_DIALOG_DATA } from "@alyle/ui/dialog";
import { STYLES as SLIDER_STYLES } from "@alyle/ui/slider";
import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent,
} from "@alyle/ui/image-cropper";

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref?.renderStyleSheet(SLIDER_STYLES);
  ref?.renderStyleSheet(CROPPER_STYLES);
  const slider = ref?.selectorsOf(SLIDER_STYLES);
  const cropper = ref?.selectorsOf(CROPPER_STYLES);

  return {
    root: lyl`{
      ${cropper.root} {
        max-width: 1040px
        height: 400px
      }
    }`,
    sliderContainer: lyl`{
      position: relative
      ${slider.root} {
        width: 80%
        position: absolute
        left: 0
        right: 0
        margin: auto
        top: -32px
      }
    }`,
    slider: lyl`{
      padding: 1em
    }`,
  };
};

@Component({
  selector: 'app-cropper-image-dialog',
  templateUrl: './cropper-image-dialog.component.html',
  styleUrls: ['./cropper-image-dialog.component.scss']
})

export class CropperImageDialogComponent implements WithStyles, AfterViewInit {
  readonly classes = this.sRenderer?.renderSheet(STYLES, "root");
  ready!: boolean;
  scale!: any;
  minScale!: number;
  @ViewChild(LyImageCropper, { static: true })
  cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 400,
    height: 400,
    // type: 'image/png',
    keepAspectRatio: false,
    responsiveArea: true,
    resizableArea: true,
  };

  constructor(
    @Inject(LY_DIALOG_DATA) private event: Event,
    readonly sRenderer: StyleRenderer,
    public dialogRef: LyDialogRef
  ) { }

  ngAfterViewInit() {
    // Load image when dialog animation has finished
    this.dialogRef?.afterOpened?.subscribe(() => {
      this.cropper?.selectInputEvent(this.event);
    });
  }
  onCropped(e: ImgCropperEvent) { }
  onLoaded(e: ImgCropperEvent) { }
  onError(e: ImgCropperErrorEvent) {
    // Close the dialog if it fails
    this.dialogRef.close();
  }
}
