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
  notificationsList: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  time: any = moment('2022-10-13:16:30:00');

  constructor(
    private publicService: PublicService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }
  getAllNotifications(): void {
    this.isLoading = true;
    this.publicService?.getAllNotifications()?.subscribe(
      (res) => {
        if (res?.code == '200') {
          this.notificationsList = res?.data;
          console.log(res?.data);
          this.isLoading = false;
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

    // this.notificationsList = [
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    //   { id: 1, title: 'Some placeholder content in a paragraph' },
    // ]
  }
  removeNotification(id: any): void {
    // this.globalService?.removeNotification(id)?.subscribe(
    //   (res: any) => {
    //     if (res?.status) {
    //       this.readNotify = res?.data;
    //       this.preventOutSide = false;
    //       this.getMyNotifications();
    //       this.isLoadingMore = false;
    //     }
    //   },
    //   (err) => {
    //     if (err?.message) {
    //       this.sweetAlertPopupService?.alertMessage(err?.message, "error");
    //     }
    //     this.preventOutSide = false;
    //     this.isLoadingMore = false;
    //     this.isLoading = false;
    //   }
    // );
    // this.cdr.detectChanges();
  }


}
