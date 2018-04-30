import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MyhospitalsComponent} from '../patient-profile/myhospitals/myhospitals.component';
import { MydoctorsComponent } from '../patient-profile/mydoctors/mydoctors.component'
@NgModule({
  imports: [
    CommonModule
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
