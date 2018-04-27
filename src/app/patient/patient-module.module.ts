import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PatientProfileComponent } from './patient-profile/patient-profile.component'; 
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyrecordsComponent } from './myrecords/myrecords.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import { MyprescriptionsComponent } from './myprescriptions/myprescriptions.component';
import { MyconsultationsComponent } from './myconsultations/myconsultations.component';
import { importType } from '@angular/compiler/src/output/output_ast';

import {PatientRoutingModule} from './patient-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule
  ],
  declarations: [
    PatientProfileComponent,
    MydoctorsComponent,
    MyrecordsComponent,
    MyhospitalsComponent,
    MyprescriptionsComponent,
    MyconsultationsComponent
  ]
})
export class PatientProfileModule { }
