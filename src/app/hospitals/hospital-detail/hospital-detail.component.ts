import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { HospitalListService } from '../hospital-list.service';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-hospital-detail',
  templateUrl: './hospital-detail.component.html',
  styleUrls: ['./hospital-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class HospitalDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  
  hospital;
  hospitalLocation: string;
  lat: Number;
  lng: Number;
  draggable = false;
  constructor(  
      private route: ActivatedRoute,
      private router: Router,
      private hospitalsService : HospitalListService
    ) { }

  ngOnInit() {
      this.getHospital();
  }
  async getHospital(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.hospital =  await this.hospitalsService.getHospital(id);
    console.log(this.hospital);
    this.lat = +this.hospital['lat'];
    this.lng = +this.hospital['lng'];
    this.hospitalLocation = this.hospital.name + ', ' + this.hospital.city + ', ' + this.hospital.country;
  }
}
