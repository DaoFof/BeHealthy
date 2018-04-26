import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { HospitalListService } from '../hospital-list.service';

@Component({
  selector: 'app-hospital-detail',
  templateUrl: './hospital-detail.component.html',
  styleUrls: ['./hospital-detail.component.css']
})
export class HospitalDetailComponent implements OnInit {
  hospital;
  constructor(  
      private route: ActivatedRoute,
      private router: Router,
      private hospitalsService : HospitalListService
    ) { }

  ngOnInit() {
   /* this.hospital = this.route.paramMap
      .switchMap((params: ParamMap)=>
        this.hospitalsService.getHospital(params.get('id'))
      )
      console.log(this.hospital);*/
      this.getHospital();
      
  }
  async getHospital(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.hospital =  await this.hospitalsService.getHospital(id);
    console.log(this.hospital);
  }
}
