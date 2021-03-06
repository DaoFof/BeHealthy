import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChooseHospitalComponent } from './choose-hospital/choose-hospital.component';
import { AuthGuard } from '../auth-guard.service';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { AppointmentRequestComponent } from './appointments-request/appointments-request.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyhospitalComponent } from './myhospital/myhospital.component';
import { PatientComponent } from './mypatient/patient.component';

const doctorProfileRoutes: Routes = [
  {
    path: 'doctorProfile',
    component: ProfileLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'appointmentrequests',
        component: AppointmentRequestComponent
      },
      {
        path: 'appointment',
        component: AppointmentsComponent
      }, {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'myhospitals',
        component: MyhospitalComponent
      }, {
        path: 'mypatients',
        component: PatientComponent
      }
    ]
  },{
    path: 'chooseHospital',
    component: ChooseHospitalComponent,
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(doctorProfileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DoctorRoutingModule { }
