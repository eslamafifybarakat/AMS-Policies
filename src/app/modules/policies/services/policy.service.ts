import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { roots } from '../../shared/TS Files/api-roots';
// import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  apiUrl = environment.apiUrl;
  // appointmentSelectedDataSubj = new BehaviorSubject<[]>([]);
  // doctorDataSubj = new BehaviorSubject<{}>({});
  // doctorFeedbackStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getPoliciesList(page?: any, per_page?: any, search?: any): Observable<any> {
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
    return this.http.get<any>(this.apiUrl + '/api/site/policies', { params: params });
  }

  addPolicy(data: any): Observable<any> {
    return this.http.post<any[]>(
      this.apiUrl + '/api/site/policies',
      data
    );
  }
  deletePolicy(id: number): Observable<any> {
    return this.http.delete<any[]>(
      this.apiUrl + '/api/site/policies/' + id
    );
  }
  getPolicyById(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/api/site/policies/${id}`);
  }
  updatePolicy(data: any, id: any): Observable<any> {
    return this.http.post<any[]>(
      this.apiUrl + '/api/site/policies/update/' + id,
      data
    );
  }

  getPolicyFormData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/api/site/countries`);
  }

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

  getHomeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + roots?.home?.getHomeData);
  }

}
