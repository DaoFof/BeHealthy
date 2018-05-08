import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChooseHospitalComponent } from './choose-hospital/choose-hospital.component';
import { AuthGuard } from '../auth-guard.service';
const doctorProfileRoutes: Routes = [
  {
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
