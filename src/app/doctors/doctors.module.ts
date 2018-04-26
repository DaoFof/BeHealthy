import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component'

import {SearchDoctorRoutingModule} from './search-doctor-routing.module'
@NgModule({
  imports: [
    CommonModule,
    SearchDoctorRoutingModule
  ],
  declarations: [
    SearchDoctorComponent,
    DoctorDetailComponent
  ]
})
export class DoctorsRouteModule { }
