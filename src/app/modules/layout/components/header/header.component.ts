import { AuthUserService } from './../../../auth/services/auth-user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = false;
  isLoggedin: boolean = false;
  currentUrl: string = '';
  title: any = '';

  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data["title"]) {
              return child.snapshot.data["title"];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        this.title = data;
      });
  }

  ngOnInit(): void {
    this.isLoggedin = this.authUserService.isLoggedIn();
    console.log(this.isLoggedin);

    // Get Current URL Routing
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    console.log(this.currentUrl);
    this.cdr.detectChanges();
  }



}
