import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) { }

  contineoRoot: string = "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  private registerHospitalPost(url: string, data) {
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders(
      { 'x-auth': token }
    );
    return this.http.post(url, data, {headers, observe: 'response' });
  }
  private getManagerHospitals(url){
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders(
      { 'x-auth': token }
    );
    return this.http.get(url, {headers, observe: 'response' });
  }

  newHospital(data) {
    let url = `${this.adress}/hospital`;
    return this.registerHospitalPost(url, data);
  }

  listManagerHospital(){
    let url = `${this.adress}/managerHospital`;
    return this.getManagerHospitals(url);
  }
}
