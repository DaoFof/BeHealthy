import { Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../user.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestAppointmentComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  doctors = [];
  ngOnInit() {
    this.getDoctors()
  }
  async getDoctors() {
    var res = await this.userService.getAllDoctor();
    this.doctors = res.body.users;
    console.log(this.doctors);
  }
  
  
}
