import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }                from '../auth-guard.service';
import {PatientProfileComponent} from './patient-profile/patient-profile.component';
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyrecordsComponent } from './myrecords/myrecords.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import { MyprescriptionsComponent } from './myprescriptions/myprescriptions.component';
import { MyconsultationsComponent } from './myconsultations/myconsultations.component';
import { RequestAppointmentComponent } from './appointments/request/request.component';
import { AppointmentsComponent } from './appointments/lists/lists.component';
import { AppointmentSchedulerComponent } from './appointments/scheduler/scheduler.component';

import { DashboardComponent } from './dashboard/dashboard.component';
const patientProfileRoutes: Routes = [
  {
    path: 'patientProfile',
    component: PatientProfileComponent,
    canActivate:[AuthGuard],
    children: [
      {
       path:'',
       canActivateChild: [AuthGuard],
       children:[
        {
          path: 'dashboard',
          component: DashboardComponent
        },{
          path: 'mydoctors',
          component: MydoctorsComponent
        },{
          path: 'myrecords',
          component: MyrecordsComponent
        },{
          path: 'myhospitals',
          component: MyhospitalsComponent
        },{
          path: 'myprescriptions',
          component: MyprescriptionsComponent
        },{
          path: 'mydiagnoses',
          component: MyconsultationsComponent
        },{
          path: 'appointments',
          children:[
          {
            path: 'request',
            component: RequestAppointmentComponent
          },{
            path: 'list',
            component: AppointmentsComponent
          },{
              path: 'scheduler/:docId/:hosId',
              component: AppointmentSchedulerComponent
          },{
            path: 'scheduler',
            redirectTo: '/patientProfile/appointments/list',
            pathMatch: 'full'
          },{
            path: 'scheduler/:rererr',
            redirectTo: '/patientProfile/appointments/list',
            pathMatch: 'full'
          },{
            path: '',
            redirectTo: '/patientProfile/appointments/list',
            pathMatch: 'full'
          }
          ]
        },{
          path: '',
          redirectTo: '/patientProfile/myhospitals',
          pathMatch: 'full'
        }
       ] 
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(patientProfileRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class PatientRoutingModule { }
