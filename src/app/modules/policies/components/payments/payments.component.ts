import { PolicyPaymentDetailsModalComponent } from './policy-payment-details-modal/policy-payment-details-modal.component';
import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { PublicService } from './../../../../services/public.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;

  searchValue: any = '';
  filterValue: any = '';
  currentPage = 1;
  pageSize = 6;
  paymentsList: any = [];

  date = new Date("10/10/1996");
  status: any = ["Active", "Not Specified", "Cancled", "Under Review"];

  tableHeaders: any = [];
  isSearch: boolean = false;
  enableSortFilter: boolean = true;
  sortObj: any = {};

  constructor(
    private paymentService: PaymentService,
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
    this.currentPage = 1;
    this.paymentService?.getPaymentsList(this.currentPage, this.pageSize, this.searchValue ? this.searchValue : null, this.sortObj ? this.sortObj : null)?.subscribe(
      (res) => {
        if (res?.code == 200) {
          this.paymentsList = res?.data;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          if (res?.message) {
            this.alertsService?.openSweetalert("info", res?.message);
          }
        }
      },
      (err) => {
        if (err?.message) {
          this.alertsService?.openSweetalert("error", err?.message);
          this.isLoading = false;
        }
      }
    );
    this.cdr?.detectChanges();

    let items = [
      {
        id: 1,
        esablishDate: this.date,
        class: "success",
        amount: "150",
        description: "there is a description for this policy",
        status: this.status[0]
      },
      {

        id: 2,
        client: 'Eslam Afify Barakat',
        esablishDate: this.date,
        class: "confirm",
        amount: "50",
        description: "there is a description for this policy there is a description for this policy there is a description for this policy",
        status: this.status[1]
      },
      {

        id: 3,
        esablishDate: this.date,
        class: "rejected",
        amount: "150",
        description: "there is a description for this policy",
        status: this.status[2]
      },
      {

        id: 4,
        client: 'Eslam Afify Barakat',
        esablishDate: this.date,
        class: "warning",
        amount: "50",
        description: "there is a description for this policy there is a description for this policy there is a description for this policy",
        status: this.status[3]
      },
      {

        id: 5,
        esablishDate: this.date,
        class: "success",
        amount: "150",
        description: "there is a description for this policy",
        status: this.status[0]
      },
      {

        id: 6,
        client: 'Eslam Afify Barakat',
        esablishDate: this.date,
        class: "confirm",
        amount: "50",
        description: "there is a description for this policy there is a description for this policy there is a description for this policy",
        status: this.status[1]
      },
      {

        id: 7,
        esablishDate: this.date,
        class: "rejected",
        amount: "150",
        description: "there is a description for this policy",
        status: this.status[2]
      },
      {

        id: 8,
        client: 'Eslam Afify Barakat',
        esablishDate: this.date,
        class: "warning",
        amount: "50",
        description: "there is a description for this policy there is a description for this policy there is a description for this policy",
        status: this.status[3]
      },
      {

        id: 9,
        client: 'Eslam Afify Barakat',
        esablishDate: this.date,
        class: "warning",
        amount: "50",
        description: "there is a description for this policy there is a description for this policy there is a description for this policy",
        status: this.status[3]
      }
    ];
    this.paymentsList = items;
  }

  applyFilter(type: any): void {
    this.currentPage = 1;
    if (type !== this.filterValue) {
      this.filterValue = type;
      this.getAllPayments();
    } else {
      this.filterValue = '';
    }
    console.log(this.filterValue);
    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.getAllPayments();
    this.cdr?.detectChanges();
  }
  applySearch(event: Event): void {
    this.isSearch = true;
    let applyFilter = (event.target as HTMLInputElement).value;
    this.searchValue = applyFilter;
    this.getAllPayments();
    this.cdr.detectChanges();

  }

  showDetails(data: any): void {
    console.log(data);
    let dialogRef = this.dialog?.open(PolicyPaymentDetailsModalComponent, {
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
