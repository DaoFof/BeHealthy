import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule}   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'

import { AppComponent } from './app.component';
import { BootstrapTwitterModule } from './bootstrap-twitter/bootstrap-twitter.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DoctorsRouteModule } from './doctors/doctors.module';
import {HospitalsRouteModule} from './hospitals/hospitals-route.module';
import {PatientProfileModule} from './patient-profile/patient-module.module'
import { DoctorModule } from './doctor-profile/doctor.module';
import {ManagerModuleModule} from './manager-profile/manager-module.module'
import {LoginRoutingModule} from './login/login-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { InformationsComponent } from './informations/informations.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationService } from './registration.service';
import { LoginService } from './login.service';
import { SocketTestService } from './socket-test.service';
import { SocketTestComponent } from './socket-test/socket-test.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    InformationsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoginComponent,
    SocketTestComponent,
    //PatientProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    HospitalsRouteModule,
    DoctorsRouteModule,
    PatientProfileModule,
    ManagerModuleModule,
    DoctorModule,
    LoginRoutingModule,
    BootstrapTwitterModule,
    AppRoutingModule
  ],
  providers: [RegistrationService, LoginService, SocketTestService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
 }
}
