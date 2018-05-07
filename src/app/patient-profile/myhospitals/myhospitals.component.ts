import { Component, OnInit } from '@angular/core';
import {HospitalService} from '../../hospital.service';

@Component({
  selector: 'app-myhospitals',
  templateUrl: './myhospitals.component.html',
  styleUrls: ['./myhospitals.component.css']
})
export class MyhospitalsComponent implements OnInit {
  hospitals;
  constructor(private hospitalService: HospitalService) { }
  loading: boolean = true;
  ngOnInit() {
    this.getHospitals();
  }
  getHospitals(){
    this.hospitalService.listManagerHospital()
      .subscribe(res=>{
        this.hospitals =  res.body;
        console.log(this.hospitals);
      });
  }
}
