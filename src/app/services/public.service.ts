import { roots } from './../modules/shared/TS Files/api-roots';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as printJS from 'print-js';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  recallUserDataStorage = new BehaviorSubject<boolean>(false);
  recallUserDataFn = new BehaviorSubject<boolean>(false);
  show_loader = new Subject<boolean>();
  pushUrlData = new BehaviorSubject<boolean>(false);
  loadingHomeData = new BehaviorSubject<boolean>(false);

  apiUrl = environment.apiUrl;

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  base64ToImageFile(data: any, filename: any) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename + "." + mime.substr(6), { type: mime });
  }

  translateTextFromJson(text: string): any {
    return this.translate.instant(text);
  }

  downloadExample(urlRoot: any): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json'
    };
    return this.http?.get<any>(`${this.apiUrl}/${urlRoot}`, httpOptions);
  }
  clearValidationErrors(control: AbstractControl): void {
    control.markAsPending();
  }



  validateAllFormFields(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
