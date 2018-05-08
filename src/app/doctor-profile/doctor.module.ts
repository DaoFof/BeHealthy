import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { DoctorRoutingModule } from './doctor-routing.module'
import { ChooseHospitalComponent } from './choose-hospital/choose-hospital.component';

import { GoogleMapService } from '../google-map.service';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    DoctorRoutingModule
  ],
  declarations: [ChooseHospitalComponent],
  providers:[
    GoogleMapService,
    AuthService
  ]
})
export class DoctorModule { }
