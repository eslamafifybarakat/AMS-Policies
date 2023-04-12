import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { PolicyService } from '../../../policies/services/policy.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-policy-dashboard',
  templateUrl: './policy-dashboard.component.html',
  styleUrls: ['./policy-dashboard.component.scss']
})
export class PolicyDashboardComponent implements OnInit {

  bgMapImg: any = 'assets/image/policy/map.jpg';

  searchValue: any = '';
  states: any = [
    {
      name: 'Arkansas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Arkansas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  filterSearch: any = [];

  isFullLoading: boolean = false;
  homeData: any;
  yourTransactions: any;
  policies: any;

  constructor(
    private policyService: PolicyService,
    private cdr: ChangeDetectorRef,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.filterSearch = this.states;
    this.getHomeData();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.filterSearch = this.states;
    this.cdr.detectChanges();
  }

  applySearch(event: Event): any {
    this.filterSearch = [];
    let filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);
    console.log(this.searchValue);
    this.states.forEach((state: any) => {
      if (state?.name?.toLowerCase()?.includes(filterValue)) {
        this.filterSearch.push(state);
      }
    });
    console.log(this.filterSearch);

    this.cdr.detectChanges;
  }

  getHomeData(): any {
    this.isFullLoading = true;
    this.policyService?.getHomeData()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.homeData = res?.data ? res?.data : null;
          this.yourTransactions = {
            purchased_policies: this.homeData?.your_transactions?.purchased_policies ? this.homeData?.your_transactions?.purchased_policies : 0,
            refunded_policies: this.homeData?.your_transactions?.refunded_policies ? this.homeData?.your_transactions?.refunded_policies : 0,
            bounce_rate: this.homeData?.your_transactions?.bounce_rate ? this.homeData?.your_transactions?.bounce_rate : 0,
          }
          this.policies = {
            active: this.homeData?.policies?.active ? this.homeData?.policies?.active : 0,
            pending: this.homeData?.policies?.pending ? this.homeData?.policies?.pending : 0,
            canceled: this.homeData?.policies?.canceled ? this.homeData?.policies?.canceled : 0,
            expired: this.homeData?.policies?.expired ? this.homeData?.policies?.expired : 0,
            under_review: this.homeData?.policies?.under_review ? this.homeData?.policies?.under_review : 0,
          }
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isFullLoading = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isFullLoading = false;
      });

    let data: any = {
      your_transactions: {
        purchased_policies: 5,
        refunded_policies: 5,
        bounce_rate: 5,
      },
      policies: {
        active: 10,
        pending: 10,
        canceled: 10,
        expired: 10,
        under_review: 10
      }
    };

    this.homeData = data;
    this.yourTransactions = this.homeData?.your_transactions;
    this.policies = this.homeData?.policies;
  }

}
