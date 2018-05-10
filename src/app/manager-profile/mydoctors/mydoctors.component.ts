import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-mydoctors',
  templateUrl: './mydoctors.component.html',
  styleUrls: ['./mydoctors.component.css']
})
export class MydoctorsComponent implements OnInit {
  doctors = [];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getDoctors();
  }
  async getDoctors() {
    let res = await this.loginService.getUser();
    this.doctors = res['body']['manager']['acceptedDoctor'];
    console.log(this.doctors);
  }
}
