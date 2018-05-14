import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HospitalListService {

  constructor(private http: HttpClient) { }
  contineoRoot: string= "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  hospitals = null;
  hospitalGET(url:string){
    let headers = new HttpHeaders({
      'x-auth': 'the value',
      "myNg": "fromAngularApp"
    }
    );
    console.log(headers);
    
    return this.http.get(url,{headers}).toPromise().then(
    res =>{
      this.hospitals = res['hospitals'];
      console.log(res['hospitals']);
      
      return res['hospitals'] || res['hospital'];
    },
    error =>(console.log(error))//error handle 
  );
}
  //in case of contineoRoot : hospitals?id=
  getHospitals(){
    let url = `/hospital`;
    return this.hospitalGET(url);
  }
  getHospital(id: string){
    let url = `/hospital/${id}`; 
    return this.hospitalGET(url);
  }
  getMyHospitals(patientId: string){
    let url = `/patientHospital/${patientId}`; 
    return this.hospitalGET(url);
  }
}
