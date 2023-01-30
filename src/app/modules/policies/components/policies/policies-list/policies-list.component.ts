import { ConfirmDeleteModalComponent } from './../../../../shared/component/confirm-delete-modal/confirm-delete-modal.component';
import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss']
})
export class PoliciesListComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;
  isWaitingAction: boolean = false;

  searchValue: any = '';
  currentPage = 1;
  pageSize = 6;
  policiesList: any = [];

  isSelect: boolean = false;
  selectedItem: any;

  constructor(
    private policyService: PolicyService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPloicies();
  }

  getAllPloicies(activeLoading?: boolean): void {
    activeLoading == false ? this.isLoading = false : this.isLoading = true;
    if (this.searchValue !== '') {
      this.currentPage = 1;
      this.policyService?.getPoliciesList(this.currentPage, this.pageSize, this.searchValue)?.subscribe(
        (res) => {
          if (res?.code == 200) {
            this.policiesList = res?.data;
            this.isLoading = false;
            this.isWaitingAction = false;
          } else {
            if (res?.message) {
              this.alertsService?.openSweetalert("info", res?.message);
            }
            this.isLoading = false;
            this.isWaitingAction = false;
          }
        },
        (err) => {
          if (err?.message) {
            this.alertsService?.openSweetalert("error", err?.message);
          }
          this.isLoading = false;
          this.isWaitingAction = false;
        }
      );
    } else {
      this.policyService?.getPoliciesList(this.currentPage, this.pageSize)?.subscribe(
        (res) => {
          if (res?.code == 200) {
            this.policiesList = res?.data;
            this.isLoading = false;
            this.isWaitingAction = false;
          } else {
            if (res?.message) {
              this.alertsService?.openSweetalert("info", res?.message);
            }
            this.isLoading = false;
            this.isWaitingAction = false;
          }
        },
        (err) => {
          if (err?.message) {
            this.alertsService?.openSweetalert("error", err?.message);
          }
          this.isLoading = false;
          this.isWaitingAction = false;
        }
      );
    }
    this.cdr.detectChanges();
  }

  onaDeleteItem(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: "40%",
      data: this.selectedItem?.name
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.confirm === true) {
        console.log(result);
        this.isWaitingAction = true;
        this.policyService?.deletePolicy(this.selectedItem?.id)?.subscribe(
          (res: any) => {
            if (res?.code == "200") {
              if (res?.message) {
                this.alertsService?.openSweetalert("success", res?.message);
              }
              this.getAllPloicies(false);
            } else {
              if (res?.message) {
                this.alertsService?.openSweetalert("info", res?.message);
              }
            }
          },
          (err: any) => {
            if (err?.message) {
              this.alertsService?.openSweetalert("error", err?.message);
            }
          });
      }
      this.cdr.detectChanges();
    });
  }

  clearSearch(): void {
    this.searchValue = '';
    this.getAllPloicies(false);
    this.cdr.detectChanges();
  }
  applySearch(event: Event): void {
    let applyFilter = (event.target as HTMLInputElement).value;
    this.searchValue = applyFilter;
    this.getAllPloicies(false);
    this.cdr.detectChanges();
  }

  goToDetails(): void {
    this.router.navigate(['/home/policies/policy-data', { id: this.selectedItem?.id}]);
  }

  onChange(page: any): void {
    this.getAllPloicies();
  }
  loadPage(page: number): void {
    this.getAllPloicies();
  }

  selected(item: any, e?: any): any {
  //   this.policiesList.forEach((e: any) => {
  //     e.isSelected = false;
  //   });
  //   this.policiesList[e - 1].isSelected = true;
  //   this.isSelect = true;
  // }
  this.selectedItem = item;
  this.policiesList.forEach((e: any) => {
    e.isSelect = false;
    console.log(e);

  });
  console.log(item);

  // this.selectedItem = item;
  this.isSelect=true;
  item.isSelect = !item.isSelect;
}
  clearAllSelected(): void {
    this.policiesList.forEach((e: any) => {
      e.isSelect= false;
    });
    this.isSelect = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
