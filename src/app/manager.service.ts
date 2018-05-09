import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManagerService {

  constructor(private http: HttpClient) { }
  contineoRoot: string = "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  private getToken() {
    var token = localStorage.getItem('token');
    return new HttpHeaders(
      { 'x-auth': token }
    );
  }
  private getAllDoctorRequest(url: string){
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }

  retrieveDoctorRequest(){
    let url = `${this.adress}/manager`;
    return this.getAllDoctorRequest(url);
  }
  acceptRequest(id){
    let url = `${this.adress}/acceptDoctorRequest`;
    let headers = this.getToken();
    return this.http.patch(url, {id},{ headers, observe: 'response' });
  }
  denyRequest(id) {
    let url = `${this.adress}/denyDoctorRequest`;
    let headers = this.getToken();
    return this.http.patch(url, { id }, { headers, observe: 'response' });
  }
}
