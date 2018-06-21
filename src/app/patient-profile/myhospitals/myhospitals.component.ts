import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-myhospitals',
  templateUrl: './myhospitals.component.html',
  styleUrls: ['./myhospitals.component.css']
})
export class MyhospitalsComponent implements OnInit {
  hospitals;
  constructor(private router: Router, private r: ActivatedRoute, private userService: UserService) { }
  loading: boolean = true;
  ngOnInit() {
    this.getUserHospital();
  }
  getUserHospital() {
    this.userService.patientDashboard()
      .subscribe(res => {
        this.hospitals = res.body['hospitalList'];
        this.loading = false;
      });
  }
}
