import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roots } from '../modules/shared/TS Files/api-roots';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getHomeData(): Observable<any> {
    return this.http?.get(roots?.homeData);
  }

}
