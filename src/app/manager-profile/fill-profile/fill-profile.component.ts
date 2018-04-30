import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css']
})
export class FillProfileComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  draggable = true;
  constructor() { }

  ngOnInit() {
  }

}
