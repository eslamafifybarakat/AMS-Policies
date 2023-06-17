import { RouterModule } from '@angular/router';
import { ConfirmDeleteModalComponent } from './../component/confirm-delete-modal/confirm-delete-modal.component';
import { TranslationChildModule } from './translation-child/translation-child.module';
import { CountdownComponent } from './../component/countdown/countdown.component';
import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AngMaterialModule } from './ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig
} from '@alyle/ui';

import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LySliderModule } from '@alyle/ui/slider';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import { LanguageSelectorComponent } from '../component/language-selector/language-selector.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CropperImageDialogComponent } from '../component/cropper-image-dialog/cropper-image-dialog.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { DynamicTableComponent } from '../component/dynamic-table/dynamic-table.component';
import { SkeletonComponent } from '../component/skeleton/skeleton.component';
import { HeaderComponent } from '../../layout/components/header/header.component';
import { FooterComponent } from '../../layout/components/footer/footer.component';
import { UserInfoComponent } from '../../layout/components/header/user-info/user-info.component';
import { ThemeComponent } from '../../layout/components/header/theme/theme.component';
import { AltButtonComponent } from '../component/alt-button/alt-button.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ScrollToTopComponent } from '../component/scroll-to-top/scroll-to-top.component';

const allShared = [
  ReactiveFormsModule,
  TranslationChildModule,
  NgxIntlTelInputModule,
  NgxStarRatingModule,
  NgbPaginationModule,
  ClickOutsideModule,
  Ng2SearchPipeModule,
  AngMaterialModule,
  SweetAlert2Module,
  TranslateModule,
  ClipboardModule,
  NgSelectModule,
  NgbAlertModule,
  PrimeNgModule,
  TimeagoModule,
  RouterModule,
  FormsModule,
  NgbModule,
];

const alyleUi = [
  LyButtonModule,
  LyToolbarModule,
  LyImageCropperModule,
  LySliderModule,
  LyIconModule,
  LyDialogModule,
  HammerModule,
];

const components = [
  ConfirmDeleteModalComponent,
  CropperImageDialogComponent,
  LanguageSelectorComponent,
  DynamicTableComponent,
  ScrollToTopComponent,
  CountdownComponent,
  AltButtonComponent,
  UserInfoComponent,
  SkeletonComponent,
  HeaderComponent,
  FooterComponent,
  ThemeComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...allShared,
    ...alyleUi
  ],
  providers: [
    [LyTheme2],
    [StyleRenderer],
    { provide: LY_THEME_NAME, useValue: "minima-light" },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true,
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true,
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    StyleRenderer,
  ],
  exports: [
    ...allShared,
    ...alyleUi,
    ...components
  ]
})
export class SharedModule { }
