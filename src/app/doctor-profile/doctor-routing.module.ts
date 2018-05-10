import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChooseHospitalComponent } from './choose-hospital/choose-hospital.component';
import { AuthGuard } from '../auth-guard.service';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const doctorProfileRoutes: Routes = [
  {
    path: 'doctorProfile',
    component: ProfileLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      
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
