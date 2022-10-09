import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.scss']
})
export class NotifcationComponent implements OnInit {
  collapse:boolean=false;
  alerts=[
    {
      "style":"background: #1a85ad2b;padding: 0.5rem",
      "icon":"assets/image/seo.svg",
      "title":"alerts.title1",
      "subtitle":"alerts.subtitle1",
      "time":moment('2022-09-1:14:00:00')
    },
    {
      "style":"background:#4000002e;padding: 0.5rem",
      "icon":"assets/image/cyber.svg",
      "title":"alerts.title2",
      "subtitle":"alerts.subtitle2",
      "time":moment('2022-08-1:14:00:00')
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "icon":"assets/image/cloud.svg",
      "title":"alerts.title3",
      "subtitle":"alerts.subtitle3",
      "time":moment('2022-06-1:14:00:00')
    },
    {
      "style":"background:#c4bc4045;padding: 0.5rem",
      "icon":"assets/image/game.svg",
      "title":"alerts.title4",
      "subtitle":"alerts.subtitle4",
      "time":moment('2022-05-1:14:00:00')
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "icon":"assets/image/cloud.svg",
      "title":"alerts.title5",
      "subtitle":"alerts.subtitle5",
      "time":moment('2022-09-1:13:30:00 pm')
    },
  ]
  logs=[
    {
      "style":"background: #1a85ad2b;padding: 0.5rem",
      "title":"100 OK",
      "subtitle":"New customer",
      "time":"2 h",
    },
    {
      "style":"background:#4000002e;padding: 0.5rem",
      "title":"200 OK",
      "subtitle":"Payment process",
      "time":"5 h",
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "title":"200 OK",
      "subtitle":"Search query",
      "time":"2 days",
    },
    {
      "style":"background:#c4bc4045;padding: 0.5rem",
      "title":"200 OK",
      "subtitle":"API connection",
      "time":"1 week",
    },
    {
    "style":"background:#ad409a57;padding: 0.5rem",
      "title":"200 OK",
      "subtitle":"Database restore",
      "time":"3 week"
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "title":"200 OK",
      "subtitle":"Search query",
      "time":"2 days",
    }
  ]
  constructor() {

   }

  ngOnInit(): void {

  }
  toggleCollapse(){
    this.collapse=!this.collapse;
  }


}
