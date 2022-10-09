import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { keys } from '../../TS Files/localstorage-key';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  LOCALIZATION_LOCAL_STORAGE_KEY = "language";
  browserLang: any

  constructor(
    private translate: TranslateService
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith("https://ipapi.co/json")) {
      return next.handle(request);
    }

    let header: any = {};
    if (window.localStorage.getItem(keys.language)) {
      header["lang"] = window.localStorage.getItem(
        keys.language
      );
    } else {
      this.browserLang = this.translate.getBrowserLang();
      localStorage.setItem(
        keys.language,
        this.browserLang
      );
    }

    let user = JSON.parse(window.localStorage.getItem(keys.userData) || "{}");

    if (user) {
      header["Authorization"] = `Bearer ${user?.data?.api_token}`;
    }

    request = request.clone({
      setHeaders: header,
      // url: request.url.replace("http", "https"),
    });

    return next.handle(request);
  }
}
