import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../login.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  toggleSidebar = false;
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
