import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  isCollapsed = true;
  constructor(private loginService: LoginService) { }
  user;
  ngOnInit() {
    this.getUserInfo();
  }
  async getUserInfo() {
    let res = await this.loginService.getUser();
    this.user = res['body'];
  }
}
