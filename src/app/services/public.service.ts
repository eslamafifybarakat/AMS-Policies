import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  recallUserDataFn = new BehaviorSubject<boolean>(false);
  recallUserDataStorage = new BehaviorSubject<boolean>(false);
  show_loader = new Subject<boolean>();
  constructor() { }

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
}
