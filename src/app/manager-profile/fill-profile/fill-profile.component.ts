import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import {GoogleMapService} from '../../google-map.service';
@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css']
})
export class FillProfileComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  
  location: any;
  latitude : any;
  longitude: any;
  address: any;
  constructor(private googleMapService: GoogleMapService) { }

  ngOnInit() {
    this.googleMapService.init(this.gmapElement);
  }

  setMapType(mapTypeId: string) {
    this.googleMapService.setMapType(mapTypeId);
  }

  setCenter() {
    this.googleMapService.setCenter(this.latitude, this.longitude);
  }

  geocode(){
    this.googleMapService.geocode(this.address, this.getLocation);
  }
  getLocation(location){
    console.log(location);
  }
  findMe() {
    this.googleMapService.findMe();
  }

  trackMe() {
    this.googleMapService.trackMe();
  }

}
