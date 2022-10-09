import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  searchValue: any = '';
  currentPage = 1;
  pageSize = 4;

  masterSelected: any;
  checkedList: any;

  date = new Date("10/10/1996");
  status: any = ["Paid", "Approved", "Rejected", "Pending"];
  items = [
    {

      id: 1,
      client: 'Moaaz Mohsen',
      client_id: '1A',
      esablishDate: this.date,
      selected: false,
      active: true,
      class: "success",
      price: "150",
      type: "Products",
      status: this.status[0]
    },
    {

      id: 2,
      client: 'Eslam Afify Barakat',
      client_id: '2A',
      esablishDate: this.date,
      selected: false,
      active: false,
      class: "confirm",
      price: "50",
      type: "Cars",
      status: this.status[1]
    },
    {

      id: 3,
      client: 'Moaaz Mohsen',
      client_id: '1A',
      esablishDate: this.date,
      selected: false,
      active: false,
      class: "rejected",
      price: "150",
      type: "Products",
      status: this.status[2]
    },
    {

      id: 4,
      client: 'Eslam Afify Barakat',
      client_id: '2A',
      esablishDate: this.date,
      selected: false,
      active: true,
      class: "warning",
      price: "50",
      type: "Cars",
      status: this.status[3]
    },
    {

      id: 5,
      client: 'Moaaz Mohsen',
      client_id: '1A',
      esablishDate: this.date,
      selected: false,
      active: true,
      class: "success",
      price: "150",
      type: "Products",
      status: this.status[0]
    },
    {

      id: 6,
      client: 'Eslam Afify Barakat',
      client_id: '2A',
      esablishDate: this.date,
      selected: false,
      active: false,
      class: "confirm",
      price: "50",
      type: "Cars",
      status: this.status[1]
    },
    {

      id: 7,
      client: 'Moaaz Mohsen',
      client_id: '1A',
      esablishDate: this.date,
      selected: false,
      active: false,
      class: "rejected",
      price: "150",
      type: "Products",
      status: this.status[2]
    },
    {

      id: 8,
      client: 'Eslam Afify Barakat',
      client_id: '2A',
      esablishDate: this.date,
      selected: false,
      active: true,
      class: "warning",
      price: "50",
      type: "Cars",
      status: this.status[3]
    },
    {

      id: 9,
      client: 'Eslam Afify Barakat',
      client_id: '2A',
      esablishDate: this.date,
      selected: false,
      active: true,
      class: "warning",
      price: "50",
      type: "Cars",
      status: this.status[3]
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }


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

  checkUncheckAll(): void {
    this.items?.forEach((e: any) => {
      e.selected = this.masterSelected;
    });
    this.getCheckedItemList();
  }
  isAllSelected(): void {
    this.masterSelected = this.items?.every(function (item: any) {
      return item.selected == true;
    })
    this.getCheckedItemList();
  }
  getCheckedItemList(): void {
    this.checkedList = [];
    this.items?.forEach((e: any) => {
      if (e.selected) {
        this.checkedList?.push(e);
      }

    });
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
