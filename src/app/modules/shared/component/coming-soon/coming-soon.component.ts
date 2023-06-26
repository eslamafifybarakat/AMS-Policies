import { keys } from './../../TS Files/localstorage-key';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  currentLang = localStorage.getItem(
    keys.language
  );

  constructor() { }

  ngOnInit(): void {
  }

}

