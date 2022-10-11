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

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filterSearch = this.states;
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

}
