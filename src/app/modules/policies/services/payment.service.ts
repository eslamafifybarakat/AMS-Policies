import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { roots } from '../../shared/TS Files/api-roots';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPaymentsList(page?: any, per_page?: any, search?: any, sort?: any): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append("page", page);
    }
    if (per_page) {
      params = params.append("per_page", per_page);
    }
    if (search) {
      params = params.append("search", search);
    }
    if (sort && Object.keys(sort)?.length > 0) {
      params = params.append("sort", JSON.stringify(sort));
    }
    return this.http?.get<any>(this.apiUrl + roots?.payments?.getPayments, { params: params });
  }
  payNow(id?: number): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.payments?.payNow + '/' + id);
  }
  checkPaymentStatus(id?: number): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.payments?.checkPaymentStatus + '/' + id);
  }
}
