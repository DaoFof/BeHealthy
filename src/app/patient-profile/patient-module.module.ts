import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { CalendarModule } from 'primeng/calendar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {PatientProfileComponent } from './patient-profile/patient-profile.component'; 
import { MydoctorsComponent } from './mydoctors/mydoctors.component';
import { MyrecordsComponent } from './myrecords/myrecords.component';
import { MyhospitalsComponent } from './myhospitals/myhospitals.component';
import { MyprescriptionsComponent } from './myprescriptions/myprescriptions.component';
import { MyconsultationsComponent } from './myconsultations/myconsultations.component';
import {ShareComponentModule} from '../share-component/share-component.module';
import {PatientRoutingModule} from './patient-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { RequestAppointmentComponent } from './appointments/request/request.component';
import { AppointmentsComponent } from './appointments/lists/lists.component';
import { AppointmentSchedulerComponent } from './appointments/scheduler/scheduler.component';


import { UserService } from '../user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CalendarModule,
    ShareComponentModule,
    PatientRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    PatientProfileComponent,
    MyrecordsComponent,
    MyprescriptionsComponent,
    MyconsultationsComponent,
    RequestAppointmentComponent,
    AppointmentsComponent,
    AppointmentSchedulerComponent,
    DashboardComponent,
    //AppointmentSchedulerComponent
  ],
  providers:[
    UserService
  ]
})
export class PatientProfileModule { }
