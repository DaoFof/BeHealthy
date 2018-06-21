import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-myhospital',
  templateUrl: './myhospital.component.html',
  styleUrls: ['./myhospital.component.css']
})
export class MyhospitalComponent implements OnInit {
  hospitals;
  constructor(private userService: UserService) { }
  loading: boolean = true;
  ngOnInit() {
    this.getUserHospital();
  }
  getUserHospital() {
    this.userService.doctorDashboard()
      .subscribe(res => {
        this.hospitals = res.body['hospitals'];
        this.loading = false;
      });
  }
}
