import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {
  textDelete: any = '';
  showRoleNameInput: boolean = false;
  name: any = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public text: any,
  ) { }

  ngOnInit(): void {
    this.textDelete = this.text;
    if (this.textDelete) {
      this.showRoleNameInput = true;
    }
  }

  onClose(confirm?: boolean) {
    if (this.showRoleNameInput) {
      this.dialogRef.close({ confirm: confirm, nameToDelete: this.name });
    } else {
      this.dialogRef.close({ confirm: confirm });
    }
  }
}
