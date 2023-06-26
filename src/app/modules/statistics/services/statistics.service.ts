import { environment } from './../../../../environments/environment';
import { roots } from '../../shared/TS Files/api-roots';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  apiUrl = environment?.apiUrl;

  constructor(private http: HttpClient) { }

  getHomeData(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.getHomeData);
  }

}
