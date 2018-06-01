import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  Types = ['Patient','Doctor', 'Hospital Manager'];
  submitted = false;
  constructor(private registrationService: RegistrationService, private router: Router) { }
  responseBody;
  headers;

  myform: FormGroup;
  firstName: FormControl; 
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  userType: FormControl;
  
  createFormControls() { 
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.userType = new FormControl('', Validators.required);
  }
  createForm() { 
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      userType: this.userType
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
    onSubmit(){
    this.submitted = true;
    this.registrationService.registrer(this.myform.value)
      .subscribe(resp=>{
        console.log(resp);
        this.responseBody =  resp.body;
        let token = resp.headers.get('x-auth');
        localStorage.setItem('token', token);
        console.log(resp.status);
        if(resp.status == 200){
          this.router.navigate(['fillprofile']);
        }
      })

      console.log(this.myform.value);
  }
}
