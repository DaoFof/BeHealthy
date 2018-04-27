import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noPause = false;
  assetPath = "../../../assets/";
  slides = [
    {image: this.assetPath+'hospital1.jpg', text: 'Text 1'},
    {image: this.assetPath+'hospital2.jpg', text: 'Text 2'},
    {image: this.assetPath+'hospital3.jpg', text: 'Text 3'},
    {image: this.assetPath+'hospital4.png', text: 'Text 3'}
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
