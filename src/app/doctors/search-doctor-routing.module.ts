import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component'

const searchDoctorRoutes : Routes = [
  { path: 'searchdoctors',  component: SearchDoctorComponent },
  { path: 'searchdoctors/:id', component: DoctorDetailComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(searchDoctorRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class SearchDoctorRoutingModule { }
