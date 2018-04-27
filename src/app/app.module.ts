import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { BootstrapTwitterModule } from './bootstrap-twitter/bootstrap-twitter.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DoctorsRouteModule } from './doctors/doctors.module';
import {HospitalsRouteModule} from './hospitals/hospitals-route.module';
import {PatientProfileModule} from './patient/patient-module.module'

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { InformationsComponent } from './informations/informations.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationService } from './registration.service';
//import { PatientProfileComponent } from './patient-profile/patient-profile.component';


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
    //PatientProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    BootstrapTwitterModule,
    HospitalsRouteModule,
    DoctorsRouteModule,
    PatientProfileModule,
    AppRoutingModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
