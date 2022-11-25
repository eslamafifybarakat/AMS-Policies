import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  apiUrl = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  profileData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/dashboard/admins/auth/profile", data);
  }

  editProfile(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/users/profile/edit-profile", data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/users/profile/change-password", data);
  }
}
