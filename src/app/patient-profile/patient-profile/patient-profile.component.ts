import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  toggleSidebar = false;
  constructor() { }

  ngOnInit() {
  }

}
