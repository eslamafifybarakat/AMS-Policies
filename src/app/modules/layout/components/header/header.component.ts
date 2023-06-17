import { AuthUserService } from './../../../auth/services/auth-user.service';
import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsedMenu: boolean = false;
  scrollDown: boolean = false;
  collapsed: boolean = false;
  isLoggedIn: boolean = false;
  currentUrl: string = '';
  title: any = '';

  @HostListener("window:scroll", ["$event"])
  handleKeyDown() {
    let element = document?.querySelector(".navbar") as HTMLElement;
    if (window.pageYOffset > 30) {
      element?.classList?.add("headerScroll");
      this.scrollDown = true;
    } else {
      element?.classList?.remove("headerScroll");
      this.scrollDown = false;
    }
  }

  constructor(
    private authUserService: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authUserService?.isLoggedIn();
    this.currentUrl = this.router?.url?.split(/[?#]/)[0];
    this.cdr?.detectChanges();
  }

}
