import { HomeService } from './services/home.service';
import { TranslationService } from './modules/shared/services/i18n/translation.service';
import { ThemeService } from './modules/shared/services/themes/theme.service';
import { DeviceLocationService } from './services/device-location.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { keys } from './modules/shared/TS Files/localstorage-key';
import { PublicService } from './services/public.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { filter, map } from 'rxjs';
import * as AOS from 'aos';
import { PrimeNGConfig } from 'primeng/api';
import { AlertsService } from './modules/shared/services/alerts/alerts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  languages = ["en", "ar"];
  browserLang: any;
  currentTheme: any;
  favIcon: HTMLLinkElement | any = document.querySelector("#appIcon");
  showSpinner: boolean = true;

  constructor(
    private deviceLocationService: DeviceLocationService,
    public translationService: TranslationService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private publicService: PublicService,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    private alertsService: AlertsService,
    public _ThemeService: ThemeService,
    private homeService: HomeService,
    private titleService: Title,
    private router: Router,
  ) {
    this.translate.addLangs(this.languages);
    const currentLang = localStorage.getItem(
      keys.language
    );
    if (currentLang !== null && currentLang !== undefined) {
      this.translate.use(currentLang);

      let direction =
        localStorage.getItem(keys.language) === "ar"
          ? "rtl"
          : "ltr";
      document.documentElement.dir = direction;
      document.documentElement.lang = currentLang;

      let getMain = document.getElementsByTagName("html")[0];
      getMain.setAttribute("lang", currentLang);
      getMain.setAttribute("class", currentLang);
      this.translateService?.stream('primeng')?.subscribe(data => {
        this.primengConfig?.setTranslation(data);
      });
    } else {
      this.browserLang = this.translate.getBrowserLang();
      localStorage.setItem(
        keys.language,
        this.browserLang
      );
      this.translate.use(this.browserLang);
      this.translate.setDefaultLang(this.browserLang);
      window.location.reload();
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute?.firstChild;
          while (child) {
            if (child?.firstChild) {
              child = child.firstChild;
            } else if (child?.snapshot?.data) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.publicService.pushUrlData.next(data);
          if (data["title"]) {
            this.titleService.setTitle(
              this.publicService.translateTextFromJson("general.siteName") +
              " | " +
              this.publicService.translateTextFromJson(data["title"])
            );
          }
        } else {
          this.titleService.setTitle(
            this.publicService.translateTextFromJson("general.siteName")
          );
        }
      });
  }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.favIcon.href = "../assets/image/logo/sm-logo.png";
    this.deviceLocationService.getUserLocation();
    AOS.init();
    this.currentTheme = window.localStorage.getItem(keys?.theme);
    if (this.currentTheme == "light") {
      this._ThemeService.setLightTheme();
    }
    if (this.currentTheme == "dark") {
      this._ThemeService.setDarkTheme();
    }
    else {
      this._ThemeService.setLightTheme();
    }
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    this.getHomeData();
  }

  getHomeData(): void {
    this.publicService?.loadingHomeData?.next(true);
    this.publicService?.show_loader?.next(true);
    this.homeService?.getHomeData()?.subscribe(
      (res: any) => {
        if (res?.code == "200") {
          localStorage?.setItem(keys?.homeData, JSON?.stringify(res?.data));
          this.publicService?.show_loader?.next(false);
          this.publicService?.loadingHomeData?.next(false);
        } else {
          res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
          this.publicService?.show_loader?.next(false);
          this.publicService?.loadingHomeData?.next(false);
        }
      },
      (err: any) => {
        err ? this.alertsService?.openSweetAlert('error', err) : '';
        this.publicService?.show_loader?.next(false);
        this.publicService?.loadingHomeData?.next(false);
      }
    )
  }
}

