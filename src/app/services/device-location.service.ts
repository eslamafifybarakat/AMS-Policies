import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from "ng2-cookies";
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceLocationService {

  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) { }

  getUserLocation(): any {
    this.http.get<any>(`https://ipapi.co/json`).subscribe((res: any) => {
      var expire = new Date();
      var time = Date.now() + ((3600 * 1000) * 24); // current time + 24 hours ///
      expire.setTime(time);
      console.log(res);
      console.log(this.device);

      Cookie.set("userLocationData", JSON.stringify(res), expire);
      window.localStorage.setItem('userLocationData', JSON.stringify(res));

    });
  }

  get device(): any {
    return this.deviceService.getDeviceInfo();
  }
  get isMobile(): boolean {
    return this.deviceService.isMobile();
  }
  get isTablet(): boolean {
    return this.deviceService.isTablet();
  }
  get isDesktop(): boolean {
    return this.deviceService.isDesktop();
  }
}
