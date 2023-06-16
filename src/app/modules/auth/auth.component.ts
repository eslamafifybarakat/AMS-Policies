import { DeviceLocationService } from './../../services/device-location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  carouselItems: any = [{
    title: 'Search for best policy',
    desc: 'Find the best policy for you and make your appointment easily.'
  },
  {
    title: 'Search for best policy2',
    desc: 'Find the best policy for you and make your appointment easily.2'
  },
  {
    title: 'Search for best policy3',
    desc: 'Find the best policy for you and make your appointment easily.3'
  }];

  constructor(
    private deviceLocationService: DeviceLocationService
  ) { }

  ngOnInit(): void {
    this.deviceLocationService?.getUserLocation();
  }

}
