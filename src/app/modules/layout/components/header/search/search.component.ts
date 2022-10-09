import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText:string="";
  collapse:boolean=false;
  newalerts:any=[];
  close:boolean=false;
  alerts =[
    {
      "style":"background: #1a85ad2b;padding: 0.5rem",
      "icon":"assets/image/seo.svg",
      "title":"Project Alice",
      "subtitle":"alerts.subtitle1"
    },
    {
      "style":"background:#4000002e;padding: 0.5rem",
      "icon":"assets/image/cyber.svg",
      "title":"HR Confidential",
      "subtitle":"alerts.subtitle2"
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "icon":"assets/image/cloud.svg",
      "title":"Company HR",
      "subtitle":"alerts.subtitle3"
    },
    {
      "style":"background:#c4bc4045;padding: 0.5rem",
      "icon":"assets/image/game.svg",
      "title":"Project Redux",
      "subtitle":"alerts.subtitle4"
    },
    {
      "style":"background:#ad409a57;padding: 0.5rem",
      "icon":"assets/image/cloud.svg",
      "title":"Company HR",
      "subtitle":"alerts.subtitle5"

    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.newalerts=this.alerts;
  }
  toggleCollapse(){
    this.collapse=!this.collapse;
  }
  filtercontent(e:any){
    this.searchText = e.target.value.toLocaleLowerCase();
    this.newalerts=this.alerts.filter(x => {
      return x.title.toLocaleLowerCase().includes(this.searchText);
        })
  }
  emptyinput():void{
    this.searchText='';
    this.newalerts=this.alerts;
  }
}
