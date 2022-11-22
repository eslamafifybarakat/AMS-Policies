import { userInfo } from './../../auth-user';
import { keys } from './../../../shared/TS Files/localstorage-key';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
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
  currentLanguage: any;

  constructor(
    // public dialogRef: MatDialogRef<VerfiyPasswordComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public router: Router,
    public translationService: TranslationService,
    public _location:Location

  ) { }
emailVerification=this.fb.group({
code:[0,[Validators.required]],
email:[userInfo.email,[Validators.required]]
})
  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
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
      this.emailVerification.patchValue({
        code:this.codeLength,
        email:this.emailVerification.value.email
      })
      console.log(this.emailVerification.value);

      // this.onNoClick();
      this.router.navigate(['/auth/new-password']);
    }, 2000);
  }
  back():void{
    this._location.back();
  }
}
