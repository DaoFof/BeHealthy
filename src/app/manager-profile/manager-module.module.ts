import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {ManagerProfileComponent} from './manager-profile/manager-profile.component';
import { MydoctorsComponent } from '../patient-profile/mydoctors/mydoctors.component';
import { MyhospitalsComponent } from '../patient-profile/myhospitals/myhospitals.component';
import { NewHospitalComponent } from './new-hospital/new-hospital.component';
import { EditHospitalComponent } from './edit-hospital/edit-hospital.component';

import {ManagerRoutingModule} from './manager-routing.module';
import {ShareComponentModule} from '../share-component/share-component.module';
import { FillProfileComponent } from './fill-profile/fill-profile.component';

import {GoogleMapService} from '../google-map.service';
import {RegistrationService} from '../registration.service';
import { FileUploadService } from '../file-upload.service';
import { HospitalService } from '../hospital.service';
import { DepartementService } from '../departement.service';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { ManagerService } from '../manager.service';
@NgModule({
  imports: [
    CommonModule,
    ShareComponentModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHQyx6ONu1Djj6FXR_G-NPcNbh-eYK9tA' //map  key
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    ManagerProfileComponent,
    NewHospitalComponent,
    FillProfileComponent,
    EditHospitalComponent,
    DoctorRegistrationComponent
  ], providers: [GoogleMapService,
     RegistrationService, 
     FileUploadService, 
     HospitalService,
    DepartementService,
    ManagerService
  ]
})
export class ManagerModuleModule { }
