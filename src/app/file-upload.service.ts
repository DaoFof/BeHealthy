import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }
  contineoRoot: string = "https://115.112.92.146:48443/contineonx-web-admin/daouda-healthyme-api";
  herokuApiRoot: string = "https://shrouded-wildwood-20663.herokuapp.com"
  localApi: string = "http://localhost:3000";
  adress = this.localApi;
  uploadAPI(url, input){
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'x-auth': token,
      "myNg": "fromAngularApp"
    }
    );
    return this.http
            .post(url, input, { headers, observe: 'response'})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
  }
  private extractData(res: HttpResponse<Promise<any>>) {
    return res;
  }

  private handleError(error: any): Promise<any> {
    return error;
  }
  upload(fileToUpload: any){
    let input = new FormData(), url = `/uploadFile`;
    input.append("file", fileToUpload);
    return this.uploadAPI(url, input);
  }
}
