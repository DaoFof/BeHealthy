import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  constructor(private loginService: LoginService, private router: Router) { 
    
  }
  token;
  login = false;
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.login = true;
    }
  }
  async goToUserProfil(){
    var res = await this.loginService.getUser();
    let userType = res['body'].userType;
    let path = '';
    if (userType == 'Hospital Manager') path = '/managerProfile'
    else if (userType == 'Patient') path = '/patientProfile'
    else
      path = '/doctorProfile'

    this.router.navigate([path]);
  }

}
