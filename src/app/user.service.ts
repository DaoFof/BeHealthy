import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private getToken() {
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'x-auth': token,
      "myNg": "fromAngularApp"
    }
    );
    return headers;
  }
  private getDoctor(url){
    //let headers = this.getToken();
    return this.http
      .get(url, { observe: 'response' })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  private getDoctors(url) {
    //let headers = this.getToken();
    return this.http
      .get(url, { observe: 'response' })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private getAll(url: string) {
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }

  private extractData(res: HttpResponse<Promise<any>>) {
    return res;
  }

  private handleError(error: any): Promise<any> {
    return error;
  }

  getDoctorDup(id){
    let url = `http://localhost:3000/doctor/${id}`;
    return this.getDoctor(url);
  }
  getAllDoctor() {
    let url = `http://localhost:3000/doctor`;
    return this.getDoctors(url);
  }

  //doctor

  actionAppoint(id, decision){
    let url = `/docActionAppointRequest`;
    let headers = this.getToken();
    return this.http.patch(url, { id, decision }, { headers, observe: 'response' });
  }

  doctorDashboard(){
    let url = '/dashboard/doctor'; 
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }
  //
  managerPatient(){
    let url = `/manager/patient`;
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }
  patientDashboard() {
    let url = '/dashboard/patient';
    let headers = this.getToken();
    return this.http.get(url, { headers, observe: 'response' });
  }
} 
