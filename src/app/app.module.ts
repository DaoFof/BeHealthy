import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BootstrapTwitterModule } from './bootstrap-twitter/bootstrap-twitter.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DoctorsRouteModule } from './doctors/doctors.module';
import {HospitalsRouteModule} from './hospitals/hospitals-route.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { InformationsComponent } from './informations/informations.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    InformationsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BootstrapTwitterModule,
    HospitalsRouteModule,
    DoctorsRouteModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
