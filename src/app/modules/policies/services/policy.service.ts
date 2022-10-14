import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  // apiUrl = environment.apiUrl;
  // appointmentSelectedDataSubj = new BehaviorSubject<[]>([]);
  // doctorDataSubj = new BehaviorSubject<{}>({});
  // doctorFeedbackStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // getPoliciesList(page?: any, per_page?: any, search?: any): Observable<any> {
  //   let params = new HttpParams();
  //   if (page) {
  //     params = params.append("page", page);
  //   }
  //   if (per_page) {
  //     params = params.append("per_page", per_page);
  //   }
  //   if (search) {
  //     params = params.append("search", search);
  //   }
  //   return this.http.get<any>(this.apiUrl + '/policies', { params: params });
  // }

  // addPolicy(data: any): Observable<any> {
  //   return this.http.post<any[]>(
  //     this.apiUrl + '/policy',
  //     data
  //   );
  // }

  // updatePolicy(data: any, id: any): Observable<any> {
  //   return this.http.post<any[]>(
  //     this.apiUrl + '/ploicy/' + id,
  //     data
  //   );
  // }

  // getPolicyById(id: any): Observable<any> {
  //   return this.http.get<any>(this.apiUrl + `/policy/${id}`);
  // }

  //   getPaymentsList(page?: any, per_page?: any, search?: any): Observable<any> {
  //     let params = new HttpParams();
  //     if (page) {
  //       params = params.append("page", page);
  //     }
  //     if (per_page) {
  //       params = params.append("per_page", per_page);
  //     }
  //     if (search) {
  //       params = params.append("search", search);
  //     }
  //     return this.http.get<any>(this.apiUrl + '/policies', { params: params });
  //   }

}
