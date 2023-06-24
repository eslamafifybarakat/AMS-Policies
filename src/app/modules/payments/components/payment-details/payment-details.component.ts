import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  details: any;

  constructor(
    public dialogRef: MatDialogRef<PaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) { }

  ngOnInit(): void {
    this.details = this.modalData?.details;
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

}
