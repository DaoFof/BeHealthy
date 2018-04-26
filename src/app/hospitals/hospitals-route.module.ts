import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {HospitalDetailComponent} from './hospital-detail/hospital-detail.component';
import {SearchHospitalComponent} from './search-hospital/search-hospital.component';
 
import {HospitalListService} from './hospital-list.service';

import {SearchHospitalRoutingModule} from './search-hospital-routing.module';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchHospitalRoutingModule
  ],
  declarations: [
    HospitalDetailComponent,
    SearchHospitalComponent
  ],
  providers: [HospitalListService]
})
export class HospitalsRouteModule { }
