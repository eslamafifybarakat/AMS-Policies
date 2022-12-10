import Validation from "../../../shared/utils/validation";
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { LayoutService } from './../../../layout/services/layout.service';
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
    public layoutService:LayoutService,
    public alertsService:AlertsService,
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
    confirmpassword: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]]
  },
  {
    validators: [Validation.match("newpassword", "confirmpassword")],
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

  submit(): void {
    this.isloadingBtn = true;
    console.log(this.changePasswordForm);
    let data={
      current_password:this.changePasswordForm.value.currentpassword,
      new_password:this.changePasswordForm.value.newpassword,
      new_password_confirmation:this.changePasswordForm.value.confirmpassword
    }
    console.log(data);

    this.layoutService?.changePassword(data)?.subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          res?.message ? this.alertsService.openSweetalert('info', res?.message) : '';
          this.isloadingBtn = false;
    //   this.router.navigate(['/auth/login']);
        } else {
          this.isloadingBtn = false;
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.error) {
          err?.error ? this.alertsService.openSnackBar(err?.error) : '';
        }
        this.isloadingBtn = false;
      }
    );
    // setTimeout(() => {
    //   this.isloadingBtn = false;
    //   this.router.navigate(['/auth/login']);
    // }, 2000);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
