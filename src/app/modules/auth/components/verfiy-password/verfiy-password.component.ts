import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verfiy-password',
  templateUrl: './verfiy-password.component.html',
  styleUrls: ['./verfiy-password.component.scss']
})
export class VerfiyPasswordComponent implements OnInit {

  isloading: boolean = false;
  isloadingBtn: boolean = false;
  isWaiting: boolean = false;

  time: any = Date.now() + ((60 * 1000) * 1); // current time + 1 minute ///
  minute: any;
  codeLength:any;

  constructor(
    public dialogRef: MatDialogRef<VerfiyPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.minute = this.time;
  }

  // this called every time when user changed the code
  onCodeChanged(code: string): void {
    console.log(code);
    this.codeLength = code;
  }

  // this called only if user entered full code
  onCodeCompleted(code: string): void {
    console.log(code);
    this.codeLength = code;
    console.log(this.codeLength);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resendCode(): void {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
      this.isWaiting = false;
      this.minute = Date.now() + ((60 * 1000) * 0.1);;
    }, 2000);
  }
  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  submit(): void {
    this.isloadingBtn = true;
    setTimeout(() => {
      this.isloadingBtn = false;
      this.onNoClick();
      this.router.navigate(['/auth/new-password']);
    }, 2000);
  }

}
