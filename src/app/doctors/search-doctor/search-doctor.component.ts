import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../doctors.service';

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.css']
})
export class SearchDoctorComponent implements OnInit {
  doctors;
  constructor(private doctorService: DoctorsService) { }

  ngOnInit() {
    this.getDoctors();
  }
  async getDoctors(){
    this.doctors = await this.doctorService.getDoctors();
  }
}
