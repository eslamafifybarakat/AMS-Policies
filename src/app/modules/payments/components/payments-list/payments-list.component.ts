import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaymentsService } from '../../services/payments.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;

  searchValue: any = '';
  filterValue: any = '';
  currentPage: any = 1;
  pageSize: any = 6;
  paymentsList: any = [];
  paymentsListCount: number = 0;

  tableHeaders: any = [];
  isSearch: boolean = false;
  enableSortFilter: boolean = true;
  sortObj: any = {};
  loadingSearch: boolean = false;

  constructor(
    private paymentService: PaymentsService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPayments();
    this.tableHeaders = [
      {
        field: 'id', header: this.publicService?.translateTextFromJson('general.id'), title: this.publicService?.translateTextFromJson('general.id'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false
        , type: 'numeric'
      },
      // { field: 'client', header: this.publicService?.translateTextFromJson('polices_list.customer_name'), title: this.publicService?.translateTextFromJson('polices_list.customer_name'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, type: 'text' },
      { field: 'status', header: this.publicService?.translateTextFromJson('general.status'), title: this.publicService?.translateTextFromJson('general.status'), sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, type: 'status' },
      { field: 'amount', header: this.publicService?.translateTextFromJson('polices_list.amount'), title: this.publicService?.translateTextFromJson('polices_list.amount'), sort: true, showDefaultSort: true, showAscSort: false, type: 'numeric' },
      { field: 'esablishDate', header: this.publicService?.translateTextFromJson('polices_list.establish_date'), title: this.publicService?.translateTextFromJson('polices_list.establish_date'), sort: true, showDefaultSort: true, showAscSort: false, type: 'date' },
      { field: 'description', header: this.publicService?.translateTextFromJson('polices_list.description'), title: this.publicService?.translateTextFromJson('polices_list.description'), sort: true, showDefaultSort: true, showAscSort: false, type: 'text' },
    ];
  }

  getAllPayments(): void {
    this.isLoading = true;
    this.paymentService?.getPaymentsList(this.currentPage, this.pageSize, this.searchValue ? this.searchValue : null, this.sortObj ? this.sortObj : null)?.subscribe(
      (res) => {
        if (res?.code == 200) {
          let arr: any = [];
          res?.data ? res?.data?.forEach((element: any) => {
            arr?.push({
              id: element?.id,
              class: element?.class ? element?.class : '',
              amount: element?.amount ? element?.amount : '',
              description: element?.description ? element?.description : '',
              status: element?.status ? element?.status : '',
              esablishDate: element?.esablishDate ? element?.esablishDate : '',
            });
          }) : '';
          this.paymentsList = arr;
          this.paymentsListCount = res?.total ? res?.total : 0;
          this.isLoading = false;
          this.loadingSearch = false;
        } else {
          this.isLoading = false;
          this.loadingSearch = false;
          if (res?.message) {
            this.alertsService?.openSweetAlert("info", res?.message);
          }
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetAlert("error", err?.message);
          this.isLoading = false;
          this.loadingSearch = false;
        }
      }
    );
    this.cdr?.detectChanges();
  }

  applyFilter(type: any): void {
    this.currentPage = 1;
    if (type !== this.filterValue) {
      this.filterValue = type;
      this.getAllPayments();
    } else {
      this.filterValue = '';
    }
    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.currentPage = 1;
    this.searchValue = '';
    this.getAllPayments();
    this.cdr?.detectChanges();
  }
  searchHandler(event: Event): void {
    this.isSearch = true;
    this.currentPage = 1;
    this.loadingSearch = true;
    let applyFilter = (event?.target as HTMLInputElement).value;
    this.searchValue = applyFilter;
    this.getAllPayments();
    this.cdr.detectChanges();
  }

  showDetails(data: any): void {
    let dialogRef = this.dialog?.open(PaymentDetailsComponent, {
      width: "35%",
      data: {
        details: data
      }
    });
    dialogRef?.afterClosed()?.subscribe((result: any) => {
      console.log(result);
    });
  }

  onChange(page: any): void {
    this.currentPage = page;
    this.getAllPayments();
  }

  clearTable(event: any): void {
    this.currentPage = 1;
    this.searchValue = null;
    this.sortObj = null;
    event?.isClear ? this.getAllPayments() : '';
  }
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllPayments();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllPayments();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }

}

