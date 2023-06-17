import { authSliderAr, authSliderEn } from './../../ams-policy-data/auth-slider';
import { DeviceLocationService } from './../../services/device-location.service';
import { keys } from '../shared/TS Files/localstorage-key';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentLanguage: any;
  carouselItems: any = [];
  constructor(
    private deviceLocationService: DeviceLocationService
  ) { }

  ngOnInit(): void {
    this.deviceLocationService?.getUserLocation();
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);

    this.carouselItems = this.currentLanguage == 'ar' ? authSliderAr?.sliderData : authSliderEn?.sliderData;
  }

}
