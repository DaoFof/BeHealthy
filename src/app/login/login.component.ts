import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public authService: AuthService, public router: Router) {
    this.token = localStorage.getItem('token');
    this.setMessage('');
  }
  message: string;
  myform: FormGroup;
  email: FormControl;
  password: FormControl;
  token;
  createFormControls(){
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }
  
  createForm(){
    this.myform = new FormGroup({
      email: this.email,
      password: this.password
    })
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  setMessage(msg) {
    this.message = msg;
  }
 
  async login() {
    this.message = 'Trying to log in ...';
 
      var userType = await this.authService.login(this.myform.value);
      console.log(userType);
      
      if(this.authService.isLoggedIn && userType) {
      var msg = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
      this.setMessage(msg);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        var path;
        if (userType == 'Hospital Manager') path='/managerProfile'
        else if (userType == 'Patient') path ='/patientProfile'
        else
          path = '/doctorProfile'
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : path;
 
        // Redirect the user
        this.router.navigate([redirect]);
      }else{
        console.log(this.authService.isLoggedIn);
        
        var msg = 'Authentication failed, email or password incorrect';
        this.setMessage(msg);
      }
  }
 
  async logout() {
    await this.authService.logout();
    var msg = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    this.setMessage(msg);
    window.location.reload();
  }
}
