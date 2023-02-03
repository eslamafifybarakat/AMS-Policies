import { PublicService } from './../../../../services/public.service';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { AuthUserService } from './../../../auth/services/auth-user.service';
import Validation from "../../../shared/utils/validation";
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private publicService: PublicService,
    public alertsService: AlertsService,
    public _AuthUser: AuthUserService,
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
    this.publicService.show_loader.next(true);
    let data = {
      current_password: this.changePasswordForm.value.currentpassword,
      new_password: this.changePasswordForm.value.newpassword,
      new_password_confirmation: this.changePasswordForm.value.confirmpassword
    }
    this._AuthUser?.changePassword(data)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.changePasswordForm?.reset();
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
          this.publicService.show_loader.next(false);
          this._AuthUser.signOut();
        } else {
          this.publicService.show_loader.next(false);
          res?.message ? this.alertsService.openSnackBar(res?.message) : '';
        }
      },
      (err: any) => {
        if (err?.message) {
          err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        }
        this.publicService.show_loader.next(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
