import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-payment-details-modal',
  templateUrl: './policy-payment-details-modal.component.html',
  styleUrls: ['./policy-payment-details-modal.component.scss']
})
export class PolicyPaymentDetailsModalComponent implements OnInit {

  details: any;
  constructor(
    public dialogRef: MatDialogRef<PolicyPaymentDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) { }

  ngOnInit(): void {
    console.log(this.modalData);
    this.details = this.modalData?.details;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
