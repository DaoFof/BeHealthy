import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  lat;
  lng;
  temp;
  desc;
  hospitalsLength;
  patientsLength;
  constructor(private http: HttpClient, private loginService: LoginService, private userService: UserService) { }

  ngOnInit() {
    this.getDoctorInfo();
  }

  async findMe() {
    if (navigator.geolocation) {
      let position = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition((position) => {
          try {
            res(position)
          } catch (e) {
            rej(e)
          }
        });
      });
      return {
        'lat': position['coords'].latitude,
        'lon': position['coords'].longitude
      };
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async getDoctorInfo(){
    let position = await this.findMe();
    let res = await this.loginService.getUser();
    this.user = res['body'];
    this.userService.doctorDashboard()
      .subscribe(res => {
        console.log(res);
        this.hospitalsLength = res.body['hospitals'].length;
        this.patientsLength = res.body['patients'].length;
      });
    this.lat = this.user.lat || position.lat;
    this.lng = this.user.lng || position.lon;
    var temperatureApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=de42018e257d1816ac30a55314a99e43&units=metric`;
    this.http.get(temperatureApiUrl)
      .subscribe(res => {
        this.temp = parseInt(res['main']['temp'], 10);
        this.desc = res['weather'][0]['description'];
      });
  }
}
