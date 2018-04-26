import { Component, OnInit } from '@angular/core';
import { HospitalListService } from '../hospital-list.service';

@Component({
  selector: 'app-search-hospital',
  templateUrl: './search-hospital.component.html',
  styleUrls: ['./search-hospital.component.css']
})
export class SearchHospitalComponent implements OnInit {
  hospitals;
  constructor(private hospitalsService : HospitalListService) { }

  ngOnInit() {
    this.getHospitals();
  }
  async getHospitals(){
    this.hospitals = await this.hospitalsService.getHospitals();
    /*console.log(this.hospitals);*/
  }
}
