import { AuthUserService } from '../../../../auth/services/auth-user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deactive',
  templateUrl: './deactive.component.html',
  styleUrls: ['./deactive.component.scss']
})
export class DeactiveComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  showeye: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeactiveComponent>,
    public fb: FormBuilder,
    public _AuthUserser: AuthUserService
  ) { }

  ngOnInit(): void {
  }
  deactiveForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)]]
  });
  get formControls(): any {
    return this.deactiveForm?.controls;
  }

  submit(): void {
    console.log(this.deactiveForm?.value);
  }
  togglepassword(): void {
    this.showeye = !this.showeye;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  signout(): void {
    this._AuthUserser.signOut();
    this.closeDialog();
  }
}
