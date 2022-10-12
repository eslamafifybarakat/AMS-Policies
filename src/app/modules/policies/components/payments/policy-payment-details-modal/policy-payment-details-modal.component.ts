import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-payment-details-modal',
  templateUrl: './policy-payment-details-modal.component.html',
  styleUrls: ['./policy-payment-details-modal.component.scss']
})
export class PolicyPaymentDetailsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PolicyPaymentDetailsModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
