import { PublicService } from './../../../../../services/public.service';
import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
import { keys } from './../../../../shared/TS Files/localstorage-key';
import { AuthUserService } from '../../../../auth/services/auth-user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userdata: any;
  collapse: boolean = false;

  constructor(
    public _AuthUserser: AuthUserService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
    this.publicService.recallUserDataFn.subscribe((res) => {
      if (res) {
        console.log('enter');
        this.getUserData();
      }
    });
  }
  getUserData(): void {
    this._AuthUserser?.getUserData()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          console.log('success');
          window.localStorage.setItem(keys.userData, JSON.stringify(res?.data) || '{}');
          this.userdata = res?.data;
          console.log(this.userdata);
          this.publicService.recallUserDataStorage.next(true);
          this.cdr.detectChanges();
        } else {
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
      }
    );
  }
  signOut(): void {
    this._AuthUserser.signOut();
  }
}
