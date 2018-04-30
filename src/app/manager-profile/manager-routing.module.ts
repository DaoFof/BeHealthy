import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {ManagerProfileComponent} from './manager-profile/manager-profile.component';
import { MydoctorsComponent } from '../patient-profile/mydoctors/mydoctors.component';
import { MyhospitalsComponent } from '../patient-profile/myhospitals/myhospitals.component';
import {NewHospitalComponent} from './new-hospital/new-hospital.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
const managerProfileRoutes: Routes = [
  {
    path: 'managerProfile',
    component: ManagerProfileComponent,
    canActivate:[],
    children:[
      {
        path:'',
        children:[
          {
            path: 'mydoctors',
            component: MydoctorsComponent
          },{
            path: 'myhospitals',
            component: MyhospitalsComponent
          },{
            path:'newhospital',
            component: NewHospitalComponent
          },{
            path: '',
            redirectTo: '/managerProfile/myhospitals',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },{
    path: 'fillprofile',
    component: FillProfileComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(managerProfileRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ManagerRoutingModule { }
