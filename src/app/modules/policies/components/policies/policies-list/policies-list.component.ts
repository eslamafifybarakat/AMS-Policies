// import { AlertsService } from './../../../../shared/services/alerts/alerts.service';
// import { PolicyService } from 'src/app/modules/policies/services/policy.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss']
})
export class PoliciesListComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isLoading: boolean = false;

  searchValue: any = '';
  currentPage = 1;
  pageSize = 6;
  policiesList: any = [];

  date = new Date("10/10/1996");
  status: any = ["Active", "Not Specified", "Cancled", "Under Review"];
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
    // private policyService: PolicyService,
    // private alertsService: AlertsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllPloicies();
  }

  getAllPloicies(): void {
    // this.isLoading = true;
    //  if (this.searchValue !=='') {
    // this.currentPage = 1;
    //   this.policyService?.getPoliciesList(this.currentPage, this.pageSize,this.searchValue)?.subscribe(
    //     (res) => {
    //       if (res?.code == 200) {
    //         this.policiesList = res?.data;
    //         this.isLoading = false;
    //       } else {
    //         this.isLoading = false;
    //         if (res?.message) {
    //           this.alertsService?.openSweetalert("info", res?.message);
    //         }
    //       }
    //     },
    //     (err) => {
    //       if (err?.message) {
    //         this.alertsService?.openSweetalert("error", err?.message);
    //       }
    //     }
    //   );
    //  } else {
    //   this.policyService?.getPoliciesList(this.currentPage, this.pageSize)?.subscribe(
    //     (res) => {
    //       if (res?.code == 200) {
    //         this.policiesList = res?.data;
    //         this.isLoading = false;
    //       } else {
    //         this.isLoading = false;
    //         if (res?.message) {
    //           this.alertsService?.openSweetalert("info", res?.message);
    //         }
    //       }
    //     },
    //     (err) => {
    //       if (err?.message) {
    //         this.alertsService?.openSweetalert("error", err?.message);
    //       }
    //     }
    //   );
    //  }
    this.cdr.detectChanges();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.getAllPloicies();
    this.cdr.detectChanges();
  }
  applySearch(event: Event): void {
    let applyFilter = (event.target as HTMLInputElement).value;
    console.log(applyFilter);
    console.log(this.searchValue);
    this.getAllPloicies();
    this.cdr.detectChanges();

  }

  goToDetails(id: any): void {
    this.router.navigate(['/home/policies/policy-data', { id: id }]);
  }

  onChange(page: any): void {
    this.getAllPloicies();
  }
  loadPage(page: number): void {
    this.getAllPloicies();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
