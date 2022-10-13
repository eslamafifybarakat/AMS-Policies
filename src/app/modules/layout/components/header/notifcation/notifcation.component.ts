import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.scss']
})
export class NotifcationComponent implements OnInit {

  collapse: boolean = false;
  items: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  time: any = moment('2022-10-13:16:30:00');
  constructor() { }

  ngOnInit(): void {

  }

  toggleCollapse() {
    this.collapse = !this.collapse;
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
