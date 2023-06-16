import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alt-button',
  templateUrl: './alt-button.component.html',
  styleUrls: ['./alt-button.component.scss']
})
export class AltButtonComponent implements OnInit {
  @Input() text: any = '';
  constructor() { }

  ngOnInit(): void {
  }

}
