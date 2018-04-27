import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  registrer(data){
    let url = `${this.adress}/users`;
    return this.registrerPOST(url, data);
  }
}
