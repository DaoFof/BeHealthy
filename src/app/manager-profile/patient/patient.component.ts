import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPatients();
  }
  async getPatients() {
    let res = this.userService.managerPatient()
    .subscribe(res=>{
      this.patients = res.body['patientList'];
    })
  }
}
