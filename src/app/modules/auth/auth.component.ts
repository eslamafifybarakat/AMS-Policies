import { DeviceLocationService } from './../../services/device-location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private deviceLocationService: DeviceLocationService
  ) { }

  ngOnInit(): void {
    this.deviceLocationService.getUserLocation();
  }

}
