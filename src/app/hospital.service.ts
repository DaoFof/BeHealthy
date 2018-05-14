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
  private getToken(){
    var token = localStorage.getItem('token');
    return new HttpHeaders({
      'x-auth': token,
      "myNg": "fromAngularApp"
    }
    );
  }
  private post(url: string, data) {
    let headers = this.getToken();
    return this.http.post(url, data, {headers, observe: 'response' });
  }
  private getAll(url: string){
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }
  private getallManagerHospital(url){
    let headers = this.getToken();
    return this.http.get(url, {headers, observe: 'response' });
  }
  private getOne(url){
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' })
  }
  private delete(url: string){
    let headers = this.getToken();
    return this.http.delete(url, { headers, observe: 'response' });
  }
  private update(url, data){
    let headers = this.getToken();
    console.log(data);
    return this.http.patch(url, data, { headers, observe: 'response' });
  }

  private updateDoctorHospital(url, data) {
    let headers = this.getToken();
    console.log(data);
    return this.http.patch(url, data, { headers, observe: 'response' });
  }

  newHospital(data) {
    let url = `/hospital`;
    return this.post(url, data);
  }

  updateHospital(id,data){
    let url = `/hospital/${id}`;
    return this.update(url, data);
  }

  listManagerHospital(){
    let url = `/managerHospital`;
    return this.getallManagerHospital(url);
  }

  deleteHospital(id){
    let url = `/hospital/${id}`;
    return this.delete(url);
  }
  
  getHospital(id: string) {
    let url = `/hospital/${id}`;
    return this.getOne(url);
  }

  listAllHospital(){
    let url = `/hospital`;
    return this.getAll(url); 
  }

  doctorAddHospital(data){
    let url = `/addDoctorHospital`;
    return this.updateDoctorHospital(url,data)
  }
}
