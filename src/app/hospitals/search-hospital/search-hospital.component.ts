import { Component, OnInit,HostBinding, Input } from '@angular/core';
import { HospitalListService } from '../hospital-list.service';
import {PaginationInstance} from 'ngx-pagination';
@Component({
  selector: 'app-search-hospital',
  templateUrl: './search-hospital.component.html',
  styleUrls: ['./search-hospital.component.css'],
})
export class SearchHospitalComponent implements OnInit {
  hospitals;
  constructor(private hospitalsService : HospitalListService) {  }
   loading: boolean = true;
  ngOnInit() {
    this.getHospitals();
  }
  getHospitals(){
    this.hospitalsService.getHospitals().then(res=>{
       this.hospitals = res;
       this.loading = false;
    });
    /*console.log(this.hospitals);*/
  }

}
