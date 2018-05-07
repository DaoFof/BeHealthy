import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  contineoRoot: string= "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
private getToken(){
  var token = localStorage.getItem('token');
  let headers = new HttpHeaders(
    { 'x-auth': token }
  );
  return headers;
}
  private loginPOST(url, data):Promise<any>{
    return this.http
      .post(url, data,{observe: 'response'})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
  private logoutPOST(url):Promise<any>{
    let headers = this.getToken();
    localStorage.removeItem('token');
    return this.http
      .delete(url,{headers})
      .toPromise()
      .then(
        res =>{
          return res;
        },
        error =>(console.log(error))//error handle 
      );  
    }
  private extractData(res: HttpResponse<Promise<any>>) {
    return res;
  }

  private handleError(error: any): Promise<any> {
    return error;
  }

  private getMe(url){
    let headers = this.getToken();
    return this.http
      .get(url, {headers, observe: 'response'})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  login(data){
    let url = `${this.adress}/users/login`
    return this.loginPOST(url, data);
  }
  logout(){
    let url = `${this.adress}/users/me/token`
    return this.logoutPOST(url);
  }
  getUser(){
    let url = `${this.adress}/users/me`;
    return this.getMe(url)
  }
}
