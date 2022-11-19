import { userInfo } from './../../auth-user';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
  currentLanguage: any;
  codeLength:any;

  constructor(
    // public dialogRef: MatDialogRef<ConfirmLoginCodeComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public router: Router,
    private cdr: ChangeDetectorRef,
    public translationService: TranslationService,
    public _location:Location

  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.minute = this.time;
  }

  confirmLoginForm = this.fb.group({
    email:[userInfo.email],
    code: [0, Validators.required]
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
    this.isloadingBtn = true;this.confirmLoginForm.patchValue({
      code:this.codeLength,
      email:userInfo.email
    })
    setTimeout(() => {
      console.log(this.confirmLoginForm.value);
      this.isloadingBtn = false;
      this.onNoClick();
      this.router.navigate(['/home'])
      // this.dialogRef.close({ verified: true });
      this.isWaiting = false;
    }, 2000);
  }

  printTimeEnd(event: any): void {
    if (event?.end) {
      this.isWaiting = true;
    }
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
  back():void{
    this._location.back();
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

}
