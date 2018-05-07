import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PatientProfileComponent } from './patient-profile/patient-profile.component'; 
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyrecordsComponent } from './myrecords/myrecords.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import { MyprescriptionsComponent } from './myprescriptions/myprescriptions.component';
import { MyconsultationsComponent } from './myconsultations/myconsultations.component';
import {ShareComponentModule} from '../share-component/share-component.module';
import {PatientRoutingModule} from './patient-routing.module';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@NgModule({
  imports: [
    CommonModule,
    ShareComponentModule,
    PatientRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    PatientProfileComponent,
    MyrecordsComponent,
    MyprescriptionsComponent,
    MyconsultationsComponent
  ]
})
export class PatientProfileModule { }
