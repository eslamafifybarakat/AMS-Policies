import { keys } from './../../../../shared/TS Files/localstorage-key';
import { ThemeService } from './../../../../shared/services/themes/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  currenttheme = window.localStorage.getItem(keys?.theme);
  theme: any = "true";

  constructor(
    public _ThemeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.theme = window.localStorage.getItem("xsitethemevalue");
  }
  light(): void {
    this.theme = window.localStorage.getItem("xsitethemevalue");
  }
  dark(): void {
    this.theme = window.localStorage.getItem("xsitethemevalue");
  }

}
