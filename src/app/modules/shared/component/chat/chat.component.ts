import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  iconchange:boolean=true;
  chaticon:boolean=false;
  active:boolean=false;
  constructor() {
  }

  ngOnInit(): void {
    AOS.init();
  }
  hoverStateIn(){
   this.iconchange=!this.iconchange;
   this.active=!this.active;
  }
}
