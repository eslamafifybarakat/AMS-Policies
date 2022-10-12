import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isloading: boolean = false;

  todayDate: Date = new Date();



  constructor(
    private location: Location,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
      this.router.navigate(['/home/policies/list']);
    }, 2000);
  }
  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
