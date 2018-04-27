import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {RegistrationService} from '../registration.service';
import {Registration} from './registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  Types = ['Patient','Doctor', 'Hospital Manager'];
  submitted = false;
  model = new Registration('', '', '', '', '');
  constructor(private registrationService: RegistrationService, private router: Router) { }
  responseBody;
  headers;
  ngOnInit() {
  }
  onSubmit(){
    this.submitted = true;
    this.registrationService.registrer(this.model)
      .subscribe(resp=>{
        console.log(resp);
        this.responseBody =  resp.body;
        const keys = resp.headers.keys();
        this.headers = keys.map(key=>
        JSON.parse(`{\"${key}\": \"${resp.headers.get(key)}\"}`));
        localStorage.setItem('token', this.headers[1]['x-auth']);
        this.router.navigate(['patientProfile']);
      })
  }
}
