import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-want-to-pay-modal',
  templateUrl: './want-to-pay-modal.component.html',
  styleUrls: ['./want-to-pay-modal.component.scss']
})
export class WantToPayModalComponent implements OnInit {
  data: any;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.data = this.config?.data;
  }

  backToList(): void {
    this.ref?.close({ list: true });
  }
  payment(): void {
    this.ref?.close({ payment: true });
  }
}
