import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { DoctorRoutingModule } from './doctor-routing.module'
import { ChooseHospitalComponent } from './choose-hospital/choose-hospital.component';

import { GoogleMapService } from '../google-map.service';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { AppointmentRequestComponent } from './appointments-request/appointments-request.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyhospitalComponent } from './myhospital/myhospital.component';
import { PatientComponent } from './mypatient/patient.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    DoctorRoutingModule
  ],
  declarations: [ChooseHospitalComponent, ProfileLayoutComponent, AppointmentRequestComponent, AppointmentsComponent, DashboardComponent, MyhospitalComponent, PatientComponent],
  providers:[
    GoogleMapService,
    AuthService,
    LoginService
  ]
})
export class DoctorModule { }
