import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-mydoctors',
  templateUrl: './mydoctors.component.html',
  styleUrls: ['./mydoctors.component.css']
})
export class MydoctorsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDoctor();
  }

  doctors = [];
  getUserDoctor(){
    this.userService.patientDashboard()
      .subscribe(res=>{
        this.doctors = res.body['doctorList'];
      });
  }
}
