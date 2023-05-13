import { AlertsService } from './../alerts/alerts.service';
import { AuthUserService } from '../../../auth/services/auth-user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private AuthUserService: AuthUserService,
    private alertsService: AlertsService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
            console.log(error);
            this.alertsService.openSweetAlert('error', error?.error?.message);

          }
          else {
            console.log('this is server side error');
            // errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            console.log(error?.error?.message);
            console.log(error?.error?.message[0]?.email[0]);
            console.log(error?.error?.message?.length);
            errorMsg = error?.error?.message?.length > 0 ? error?.error?.message[0]?.email[0] : error?.error?.message;
            // errorMsg=error?.error?.message[0]?.email[0];
            // if (error?.error?.message?.length > 0) {
            this.alertsService.openSweetAlert('error', errorMsg);
            // } else {
            // this.alertsService.openSweetAlert('error', error?.error?.message);
            // }
          }
          if (error?.status == 500) {

          }
          if (error?.status == 403) {
            // window.location.reload();
          }

          if (error?.status == 404) {
          }
          if (error?.status == 400) {
          }
          if (error?.status == 401) {
            //Remove all items in local storage, beacuse this request was expired from another device
            this.AuthUserService?.signOut();
            this.alertsService.openSweetAlert('error', error?.error?.message);
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
