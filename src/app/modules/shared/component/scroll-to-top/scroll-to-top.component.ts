import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  windowScrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    if (
      window.pageYOffset > 200 ||
      document?.documentElement?.scrollTop ||
      document?.body.scrollTop > 200
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window?.pageYOffset) ||
      document?.documentElement?.scrollTop ||
      document?.body?.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  scrollToTop(): void {
    (function smoothscroll() {
      var currentScroll =
        document?.documentElement?.scrollTop || document?.body?.scrollTop;
      if (currentScroll > 0) {
        window?.scrollTo(0, 0);
      }
    })();
  }

  ngOnInit() { }
}
