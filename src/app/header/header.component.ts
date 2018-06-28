import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  constructor() { 
    
  }
  token;
  login = false;
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.login = true;
    }
  }

}
