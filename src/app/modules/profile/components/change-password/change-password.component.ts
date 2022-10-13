import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmPasswordValidator } from './confirm-password-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isloadingBtn: boolean = false;
  showeyeCurr: boolean = false;
  showeye: boolean = false;
  showeye2: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  changePasswordForm = this.fb.group({
    currentpassword: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    newpassword: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    confirmpassword: ['', Validators.required]
  },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
  )
  get formControls(): any {
    return this.changePasswordForm.controls;
  }

  togglecurrpassword(): void {
    this.showeyeCurr = !this.showeyeCurr;
  }
  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  togglepassword_confirm(): void {
    this.showeye2 = !this.showeye2;
  }

  submit(): void {
    this.isloadingBtn = true;
    console.log(this.changePasswordForm);
    setTimeout(() => {
      this.isloadingBtn = false;
      this.router.navigate(['/auth/login']);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
