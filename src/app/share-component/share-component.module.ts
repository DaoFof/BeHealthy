import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import {MyhospitalsComponent} from '../patient-profile/myhospitals/myhospitals.component';
import { MydoctorsComponent } from '../patient-profile/mydoctors/mydoctors.component'
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [
    MyhospitalsComponent,
    MydoctorsComponent
  ],
  exports:[
    MyhospitalsComponent,
    MydoctorsComponent
  ]
})
export class ShareComponentModule { }
