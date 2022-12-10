import { keys } from './../../../../shared/TS Files/localstorage-key';
import { AuthUserService } from '../../../../auth/services/auth-user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  // userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
  collapse: boolean = false;

  constructor(
    private router: Router,
    public _AuthUserser: AuthUserService
  ) {
    // console.log(this.userdata);
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this._AuthUserser.signOut();
  }
}
