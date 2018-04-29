import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import {LoginService} from './login.service';
import { ProgressbarComponent } from 'ngx-bootstrap';

@Injectable()
export class AuthService {
  constructor(private loginService : LoginService){ }
  responseBody;
  headers;
  isLoggedIn = false;
  
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  async login(authInfo){
    var resp = await this.loginService.login(authInfo);
    console.log(resp);
    if(resp.status==200){
      this.isLoggedIn = true;
      const keys = resp.headers.keys();
          this.headers = keys.map(key=>
          JSON.parse(`{\"${key}\": \"${resp.headers.get(key)}\"}`));  
          localStorage.setItem('token', this.headers[1]['x-auth']);
          this.responseBody = resp.body;
          return Promise.resolve(true);
    }else{
      return Promise.reject;
    }
  }

  async logout() {
    var resp = await this.loginService.logout();
    if(resp==null){
      this.isLoggedIn = false;
    }
  }
}