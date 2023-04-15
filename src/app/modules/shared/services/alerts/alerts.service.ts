import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) { }

  openSweetAlert(sweetAlertIcon: any, sweetAlertMsg: any) {
    Swal.fire({
      // icon [error , info , success , warning , question]
      // position [top-end , bottom-end , bottom-start , top-start]
      title: '',
      text: sweetAlertMsg,
      icon: sweetAlertIcon,
      confirmButtonText: this.translateService.instant('ok'),
      // timer: 1500,
      // showCloseButton: true,
    });
  }
  openSnackBar(message: string, duration?: number, horizontal?: MatSnackBarHorizontalPosition, vertical?: MatSnackBarVerticalPosition) {
    //  vertical=['top','bottom']
    //  horizontal=['start','center','end','left','right']
    this._snackBar.open(message, 'X', {
      duration: duration ? duration : 2000,
      horizontalPosition: horizontal ? horizontal : 'center',
      verticalPosition: vertical ? vertical : 'bottom',
    });
  }

}
