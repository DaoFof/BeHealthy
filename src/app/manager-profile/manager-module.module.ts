import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import {ManagerProfileComponent} from './manager-profile/manager-profile.component';
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import { NewHospitalComponent } from './new-hospital/new-hospital.component';
import { EditHospitalComponent } from './edit-hospital/edit-hospital.component';

import {ManagerRoutingModule} from './manager-routing.module';
import { FillProfileComponent } from './fill-profile/fill-profile.component';

import {GoogleMapService} from '../google-map.service';
import {RegistrationService} from '../registration.service';
import { FileUploadService } from '../file-upload.service';
import { HospitalService } from '../hospital.service';
import { DepartementService } from '../departement.service';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { ManagerService } from '../manager.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';
import { PatientComponent } from './patient/patient.component';
@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHQyx6ONu1Djj6FXR_G-NPcNbh-eYK9tA' //map  key
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
    ManagerProfileComponent,
    NewHospitalComponent,
    FillProfileComponent,
    MydoctorsComponent,
    MyhospitalsComponent,
    EditHospitalComponent,
    DoctorRegistrationComponent,
    DashboardComponent,
    AppointmentRequestComponent,
    PatientComponent
  ], providers: [GoogleMapService,
     RegistrationService, 
     FileUploadService, 
     HospitalService,
    DepartementService,
    ManagerService
  ]
})
export class ManagerModuleModule { }
