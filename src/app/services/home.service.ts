import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roots } from '../modules/shared/TS Files/api-roots';
import { keys } from '../modules/shared/TS Files/localstorage-key';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl = environment?.apiUrl;
  language: any = localStorage?.getItem(keys?.language);

  constructor(
    private http: HttpClient
  ) { }

  getHomeData(): Observable<any> {
    if (this.language == 'ar') {
      return this.http?.get(this.apiUrl + roots?.homeDataAr);
    } else {
      return this.http?.get(this.apiUrl + roots?.homeData);
    }
  }
  getAllNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl + roots?.home?.getNotifications);
  }
  markNotification(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + roots?.home?.markNotification + '/' + id);
  }
  markAllNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl + roots?.home?.markAllNotifications);
  }
}
