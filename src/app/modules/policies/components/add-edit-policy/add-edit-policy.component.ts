import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-policy',
  templateUrl: './add-edit-policy.component.html',
  styleUrls: ['./add-edit-policy.component.scss']
})
export class AddEditPolicyComponent implements OnInit {
  isLoading: boolean = false;
  isEdit: boolean = false;
  id: any;
  constructor() { }

  ngOnInit(): void {
  }
  onStepChange(event: any): void { }
}
