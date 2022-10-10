import { keys } from './../shared/TS Files/localstorage-key';
import { AuthUserService } from './../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  imageUser: any = 'https://www.facebook.com/photo?fbid=3431412950405130&set=a.1378383755708070';
  userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");

  constructor(
    public _AuthUserser: AuthUserService
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this._AuthUserser.signOut();
  }

}
