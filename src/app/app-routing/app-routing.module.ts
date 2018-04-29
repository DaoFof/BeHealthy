import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { RegistrationComponent } from '../registration/registration.component';
import { InformationsComponent } from '../informations/informations.component';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'news', component: InformationsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{
      //enableTracing: true
    })
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
