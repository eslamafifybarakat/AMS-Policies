import { keys } from './../../TS Files/localstorage-key';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: any;
  localeEvent = new Subject<string>();
  constructor(public translate: TranslateService) { }
  /**
   * Change language
   */
  changeLang(lang: string) {
    this.currentLang = localStorage.getItem(keys.language);
    if (this.currentLang !== lang) {
      localStorage.setItem(keys.language, lang);
      window.location.reload();
    }
    setTimeout(() => {
      this.translate.use(lang);
      this.localeEvent.next(lang);

      let direction =
        localStorage.getItem(keys.language) === "ar"
          ? "rtl"
          : "ltr";
      document.documentElement.dir = direction;
      document.documentElement.lang = this.currentLang;

      let getMain = document.getElementsByTagName("html")[0];
      getMain.setAttribute("lang", this.currentLang);
      getMain.setAttribute("class", this.currentLang);
    }, 1000);
  }

  /**
   * Returns selected language
   */
  getSelectedLanguage(): any {
    return (
      localStorage.getItem("hashLanguage") || this.translate.getDefaultLang()
    );
  }
}
