import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  isCollapsed = true;
  constructor(private loginService: LoginService, public authService: AuthService, public router: Router) { }
  user;
  ngOnInit() {
    this.getUserInfo();
  }
  async getUserInfo() {
    let res = await this.loginService.getUser();
    this.user = res['body'];
  }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
