import { PrintService } from './../../../../shared/services/print/print.service';
import { ConfirmDeleteModalComponent } from './../../../../shared/component/confirm-delete-modal/confirm-delete-modal.component';
import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
import { PublicService } from '../../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';
import { roots } from '../../../../shared/TS Files/api-roots';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
// import { saveAs } from 'file-saver';

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

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  loadingIndicator: boolean = false;
  usersList$!: Observable<any>;
  usersCount: number = 0;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 5;
  pagesCount: number = 0;
  rowsOptions: number[] = [5, 10, 15, 30];

  enableSortFilter: boolean = true;
  filtersArray: any = [];
  sortObj: any = {};
  constructor(
    private policyService: PolicyService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private printService: PrintService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPloicies();
    this.tableHeaders = [
      {
        field: 'job_id', header: this.publicService?.translateTextFromJson('polices_list.sale_id'), title: this.publicService?.translateTextFromJson('polices_list.sale_id'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false
        , type: 'numeric'
      },
      { field: 'name', header: this.publicService?.translateTextFromJson('polices_list.customer_name'), title: this.publicService?.translateTextFromJson('polices_list.customer_name'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, type: 'text' },
      { field: 'id', header: this.publicService?.translateTextFromJson('polices_list.customer_id'), title: this.publicService?.translateTextFromJson('polices_list.customer_id'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, type: 'numeric' },
      { field: 'start_date', header: this.publicService?.translateTextFromJson('polices_list.establish_date'), title: this.publicService?.translateTextFromJson('polices_list.establish_date'), sort: true, showDefaultSort: true, showAscSort: false, type: 'date' },
      { field: 'fees', header: this.publicService?.translateTextFromJson('polices_list.invoice_price'), title: this.publicService?.translateTextFromJson('polices_list.invoice_price'), sort: true, showDefaultSort: true, showAscSort: false, type: 'numeric' },
      { field: 'duration', secondField: 'duration_type', header: this.publicService?.translateTextFromJson('general.duration'), title: this.publicService?.translateTextFromJson('general.duration'), sort: true, showDefaultSort: true, showAscSort: false, type: 'numeric' },
      { field: 'status', header: this.publicService?.translateTextFromJson('general.status'), title: this.publicService?.translateTextFromJson('general.status'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, type: 'status' },
    ];
  }

  getAllPloicies(activeLoading?: boolean): void {
    activeLoading == false ? this.isLoading = false : this.isLoading = true;
    if (this.searchValue !== '') {
      this.currentPage = 1;
      this.policyService?.getPoliciesList(this.currentPage, this.pageSize, this.searchValue, this.sortObj ? this.sortObj : null)?.subscribe(
        (res) => {
          if (res?.code == 200) {
            this.policiesList = res?.data;
            console.log(res?.data);
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
      this.policyService?.getPoliciesList(this.currentPage, this.pageSize, null, this.sortObj ? this.sortObj : null)?.subscribe(
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

  printTable(tableData: any): void {
    let data = tableData;
    let properties: any = [];
    this.tableHeaders?.forEach((item: any) => {
      properties?.push(item?.field)
    });
    this.printService?.printJson(data, properties);
  }

  onaDeleteItem(item?: any): void {
    console.log(item);

    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: "40%",
      // data: this.selectedItem?.name
      data: item?.item?.name
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.confirm === true) {
        console.log(result);
        this.isWaitingAction = true;
        this.policyService?.deletePolicy(this.selectedItem?.id || item?.item?.id)?.subscribe(
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

  print(item?: any): void {
    this.printService?.printPdf('../../../../../../assets/image/async-awit.pdf');
  }

  downloadFile(): void {
    this.isLoadingFileDownload = true;
    this.publicService?.downloadExampleFn(roots?.home?.downloadFile)?.subscribe(
      (response: Blob) => {
        // saveAs(response, 'users.xlsx');
      },
      (err: any) => {
        err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        this.isLoadingFileDownload = false;
      });
    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.getAllPloicies(false);
    this.cdr.detectChanges();
  }
  applySearch(event: Event): void {
    this.isSearch = true;
    let applyFilter = (event.target as HTMLInputElement).value;
    this.searchValue = applyFilter;
    this.getAllPloicies(false);
    this.cdr.detectChanges();
  }

  goToDetails(item?: any): void {
    this.router.navigate(['/home/policies/policy-data', { id: this.selectedItem?.id || item?.id }]);
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
    this.isSelect = true;
    item.isSelect = !item.isSelect;
  }
  clearAllSelected(): void {
    this.policiesList.forEach((e: any) => {
      e.isSelect = false;
    });
    this.isSelect = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  clearTable(event: any): void {
    this.sortObj = null;
    this.filtersArray = [];
    event?.isClear ? this.getAllPloicies(false) : '';
  }
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllPloicies(false);
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllPloicies(false);
    }
  }
}
