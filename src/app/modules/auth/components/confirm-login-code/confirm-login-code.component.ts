import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-login-code',
  templateUrl: './confirm-login-code.component.html',
  styleUrls: ['./confirm-login-code.component.scss']
})
export class ConfirmLoginCodeComponent implements OnInit {

  isloading: boolean = false;
  isloadingBtn: boolean = false;
  isWaiting: boolean = false;

  time: any = Date.now() + ((60 * 1000) * 1); // current time + 1 minute ///
  minute: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmLoginCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.minute = this.time;
  }

  dialogform = this.fb.group({
    code: ['', Validators.required]
  })

  resendCode(): void {
    this.isloading = true
    setTimeout(() => {
      this.isloading = false;
      this.isWaiting = false;
      this.minute = Date.now() + ((60 * 1000) * 0.1);
      this.cdr.detectChanges();
    }, 500);
  }
  confirm(): void {
    this.isloadingBtn = true;
    setTimeout(() => {
      this.isloadingBtn = false;
      this.onNoClick();
      this.dialogRef.close({ verified: true });
      this.isWaiting = false;
    }, 2000);
  }

  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
