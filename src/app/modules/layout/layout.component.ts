import { AlertsService } from './../shared/services/alerts/alerts.service';
import { LayoutService } from './services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoadingBtn:boolean=false
  constructor(
    private layoutService:LayoutService,
    private alertsService:AlertsService,
  ) { }

  ngOnInit(): void {
    this.isLoadingBtn = true;
    this.layoutService?.profileData('')?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          this.isLoadingBtn = false;
        } else {
          this.isLoadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.error) {
          err?.error ? this.alertsService.openSnackBar(err?.error) : '';
        }
        this.isLoadingBtn = false;
      }
    );
  }
}
