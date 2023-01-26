import { keys } from './../shared/TS Files/localstorage-key';
import { AuthUserService } from './../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");

  constructor(
    public _AuthUserser: AuthUserService
  ) { }

  ngOnInit(): void { }

  signOut(): void {
    this._AuthUserser.signOut();
  }

}
