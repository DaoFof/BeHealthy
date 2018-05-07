import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  isCollapsed = true;
  constructor( private loginService: LoginService) { }
  user ;
  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo (){
    let res= await this.loginService.getUser();
    this.user = res['body'];
    console.log(this.user);
  }
}
