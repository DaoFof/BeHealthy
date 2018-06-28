import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DepartementService {

  constructor(private http: HttpClient) { }
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  getDepartements(){
    let url = `/departement`;
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'x-auth': token,
      "myNg": "fromAngularApp"
    }
    );
    return this.http.get(url, { headers, observe: 'response' });
  }
}
