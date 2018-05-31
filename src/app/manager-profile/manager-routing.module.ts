import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {ManagerProfileComponent} from './manager-profile/manager-profile.component';
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import {NewHospitalComponent} from './new-hospital/new-hospital.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
import { EditHospitalComponent } from './edit-hospital/edit-hospital.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';

import { AuthGuard } from '../auth-guard.service';

const managerProfileRoutes: Routes = [
  {
    path: 'managerProfile',
    component: ManagerProfileComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'',
        canActivateChild: [AuthGuard],
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
            path: 'dashboard',
            component: DashboardComponent
          },{
            path:'edithospital/:id',
            component: EditHospitalComponent,
          },{
            path: 'doctorregistration',
            component: DoctorRegistrationComponent,
          },{
            path: 'appointmentrequests',
            component: AppointmentRequestComponent
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
    component: FillProfileComponent,
    canActivate: [AuthGuard],
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
