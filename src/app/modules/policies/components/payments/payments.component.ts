import { PolicyPaymentDetailsModalComponent } from './policy-payment-details-modal/policy-payment-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  searchValue: any = '';
  filterValue: any = '';
  currentPage = 1;
  pageSize = 6;

  date = new Date("10/10/1996");
  status: any = ["Active", "Not Specified", "Cancled", "Under Review"];
  items = [
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

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  openModal(data: any): void {
    console.log(data);
    let dialogRef = this.dialog.open(PolicyPaymentDetailsModalComponent, {
      width: "35%",
      data: {
        details: data
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
  applyFilter(type: any): void {
    this.currentPage = 1;
    if (type !== this.filterValue) {
      this.filterValue = type;
    } else {
      this.filterValue = '';
    }
    console.log(this.filterValue);
    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.cdr.detectChanges();
  }

  applySearch(event: Event): void {
    let applyFilter = (event.target as HTMLInputElement).value;
    console.log(applyFilter);
    console.log(this.searchValue);
    this.cdr.detectChanges();

  }

  onChange(page: any): void {
    // this.getDoctorsList();
  }
  loadPage(page: number): void {
    // this.getDoctorsList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
