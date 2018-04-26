import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {HospitalDetailComponent} from './hospital-detail/hospital-detail.component';
import {SearchHospitalComponent} from './search-hospital/search-hospital.component';

const searchHospitalRoutes : Routes = [
  { path: 'searchhospitals',  component: SearchHospitalComponent },
  { path: 'hospital/:id', component: HospitalDetailComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(searchHospitalRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class SearchHospitalRoutingModule { }
