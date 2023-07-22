import { HomeService } from './../../../../../services/home.service';
import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.scss']
})
export class NotifcationComponent implements OnInit {
  isLoading: boolean = false;
  collapse: boolean = false;
  notificationsList: any = [];
  time: any = moment('2022-10-13:16:30:00');
  totalCount: any = 0;
  notReadCount: number = 0;

  constructor(
    private publicService: PublicService,
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }
  getAllNotifications(hideLoading?: any): void {
    hideLoading ? '' : this.isLoading = true;
    this.homeService?.getAllNotifications()?.subscribe(
      (res: any) => {
        if (res?.code == '200') {
          this.notificationsList = res?.data?.notification;
          this.totalCount = res?.total;
          this.notReadCount = res?.data?.NotReadCount;
          this.isLoading = false;
          // this.notificationsList = [
          //   { id: 1, title: 'Title', description: 'description', status: 1 },
          //   { id: 1, title: 'Title', description: 'description', status: 0 },
          //   { id: 1, title: 'Title', description: 'description', status: 1 },
          //   { id: 1, title: 'Title', description: 'description', status: 0 },
          // ];
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
      }
    );
    this.cdr?.detectChanges();

  }
  markNotification(id: any): void {
    this.homeService?.markNotification(id)?.subscribe(
      (res: any) => {
        if (res?.code == '200') {
          this.getAllNotifications(true);
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
      }
    );
    this.cdr?.detectChanges();
  }
  markAllNotifications(): void {
    this.homeService?.markAllNotifications()?.subscribe(
      (res: any) => {
        if (res?.code == '200') {
          this.getAllNotifications(true);
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
      }
    );
    this.cdr?.detectChanges();
  }
}
