import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }

  contineoRoot: string= "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  registrerPOST(url: string, data){
    return this.http.post(url,data,{observe: 'response'});
  }
  updatePATCH(url:string, data: any){
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders(
      {
        'x-auth':token,
        "myNg": "fromAngularApp"
      }
    );
    return this.http.patch(url, data, {headers, observe:'response'});
  }

  registrer(data){
    let url = `/users`;
    return this.registrerPOST(url, data);
  }
  updateInfo(data){
    let url = `/user`;
    var res =  this.updatePATCH(url, data);
    console.log(res);
    return res;
  }
}
