import { PrintService } from './../../../../shared/services/print/print.service';
import { ConfirmDeleteModalComponent } from './../../../../shared/component/confirm-delete-modal/confirm-delete-modal.component';
import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
import { PublicService } from '../../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';
import { roots } from '../../../../shared/TS Files/api-roots';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

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

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  tableHeaders: any = [];

  enableSortFilter: boolean = true;
  sortObj: any;
  loadingSearch: boolean = false;

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

  getAllPloicies(activeLoading?: boolean, paginate?: boolean): void {
    activeLoading == false ? this.isLoading = false : this.isLoading = true;
    this.policyService?.getPoliciesList(this.currentPage, this.pageSize, this.searchValue ? this.searchValue : null, this.sortObj ? this.sortObj : null)?.subscribe(
      (res) => {
        if (res?.code == 200) {
          let arr: any = [];
          arr = res?.data;
          this.policiesList = arr;
          console.log(res?.data);
          this.isLoading = false;
          this.isWaitingAction = false;
          this.loadingSearch = false;
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
          this.isWaitingAction = false;
          this.loadingSearch = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
        this.isWaitingAction = false;
        this.loadingSearch = false;
      }
    );
    this.cdr?.detectChanges();
  }

  applySearch(event: Event): void {
    this.currentPage = 1;
    this.isSearch = true;
    this.loadingSearch = true;
    let applyFilter = (event.target as HTMLInputElement).value;
    this.searchValue = applyFilter;
    this.getAllPloicies(false);
    this.cdr?.detectChanges();
  }
  clearSearch(): void {
    this.currentPage = 1;
    this.searchValue = '';
    this.getAllPloicies(false);
    this.cdr?.detectChanges();
  }

  printTable(data: any): void {
    this.policyService?.getPoliciesList(this.currentPage, this.pageSize, this.searchValue ? this.searchValue : null, this.sortObj ? this.sortObj : null, false)?.subscribe(
      (res) => {
        if (res?.code == 200) {
          this.policiesList = res?.data;
          let data = this.policiesList;
          let properties: any = [];
          this.tableHeaders?.forEach((item: any) => {
            properties?.push(item?.field)
          });
          this.printService?.printJson(data, properties);
          this.isLoading = false;
          this.isWaitingAction = false;
        } else {
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
          this.isLoading = false;
          this.isWaitingAction = false;
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
        }
        this.isLoading = false;
        this.isWaitingAction = false;
      }
    );
  }

  downloadFile(): void {
    this.isLoadingFileDownload = true;
    this.publicService?.downloadExample(roots?.home?.exportFile)?.subscribe(
      (response: Blob) => {
        saveAs(response, 'policies.xlsx');
      },
      (err: any) => {
        err?.message ? this.alertsService.openSnackBar(err?.message) : '';
        this.isLoadingFileDownload = false;
      });
    this.cdr?.detectChanges();
  }

  print(item?: any): void {
    this.printService?.printPdf(item?.pdf);
  }
  goToDetails(item?: any): void {
    this.router?.navigate(['/policies/add-edit-policy', { id: item?.id }]);
  }
  onaDeleteItem(item?: any): void {
    const dialogRef = this.dialog?.open(ConfirmDeleteModalComponent, {
      width: "40%",
      data: item?.item?.name
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.confirm === true) {
        console.log(result);
        this.isWaitingAction = true;
        this.policyService?.deletePolicy(item?.item?.id)?.subscribe(
          (res: any) => {
            if (res?.code == "200") {
              if (res?.message) {
                this.alertsService?.openSweetAlert("success", res?.message);
              }
              this.getAllPloicies(false);
            } else {
              if (res?.message) {
                this.alertsService?.openSweetAlert("info", res?.message);
              }
            }
          },
          (err: any) => {
            if (err?.message) {
              this.alertsService?.openSweetAlert("error", err?.message);
            }
          });
      }
      this.cdr?.detectChanges();
    });
  }

  onChange(page: any): void {
    this.getAllPloicies();
  }

  clearTable(event: any): void {
    this.searchValue = '';
    this.sortObj = null;
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

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
