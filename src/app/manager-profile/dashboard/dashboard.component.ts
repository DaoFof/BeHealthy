import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private loginService: LoginService) { }
  user;
  lat;
  lng;
  temp ;
  desc;
  doctors ;
  doctorReq;
  notificationLength = 0;
  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    let res = await this.loginService.getUser();
    this.user = res['body'];
    console.log(this.user);
    this.doctors = +this.user.manager.acceptedDoctor.length;;
    this.doctorReq = +this.user.manager.doctorRequest.length;
    this.notificationLength += this.user.manager.doctorRequest.length;
    this.lat = this.user.lat;
    this.lng = this.user.lng;
    var temperatureApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=de42018e257d1816ac30a55314a99e43&units=metric`;
    this.http.get(temperatureApiUrl)
      .subscribe(res => {
        console.log(res);
        this.temp = parseInt(res['main']['temp'], 10);
        this.desc = res['weather'][0]['description'];
      })
  }
}
