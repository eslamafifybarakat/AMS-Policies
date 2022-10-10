import { AuthUserService } from './../../../auth/services/auth-user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = false;
  isLoggedin: boolean = false;
  currentUrl: string = '';

  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authUserService.isLoggedIn();
    console.log(this.isLoggedin);

    // Get Current URL Routing
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    console.log(this.currentUrl);
    this.cdr.detectChanges();
  }



}
