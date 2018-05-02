import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {GoogleMapService} from '../../google-map.service';
import {RegistrationService} from '../../registration.service';
@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css']
})
export class FillProfileComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  
  location: any;
  latitude : any;
  longitude: any;
  address: any;
  msg: String;
  imgurl: any;
  submitAttempt = false;
  myform: FormGroup;
  contact: FormControl;
  country: FormControl;
  city: FormControl;
  pan: FormControl;
  image: FormControl;
  responseBody;
  headers;
  constructor(private googleMapService: GoogleMapService, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {
    this.googleMapService.init(this.gmapElement);
    this.createFormControls();
    this.createForm();
  }
  createFormControls() { 
    this.contact = new FormControl('', Validators.required);
    this.country = new FormControl('', Validators.required);
    this.pan = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
   // this.image = new FormControl('', Validators.required);
  }
  createForm() { 
    this.myform = new FormGroup({
      contact: this.contact,
      country: this.country,
      pan: this.pan,
      city: this.city,
     // image: this.image
    });
  }
  readUrl(event:any) {
    //console.log(event);
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        console.log(event);
        
        this.imgurl = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit(){
    console.log(this.myform.value);
    this.submitAttempt = true;
    if(this.myform.invalid){
      this.msg = "Please fill all above fields";
    }
    this.registrationService.updateInfo(this.myform.value)
      .subscribe(resp=>{
        console.log(resp);
        this.responseBody =  resp.body;
        const keys = resp.headers.keys();
        this.headers = keys.map(key=>
        JSON.parse(`{\"${key}\": \"${resp.headers.get(key)}\"}`));
        localStorage.setItem('token', this.headers[1]['x-auth']);
        if(resp.status == 200){
          //this.router.navigate(['managerProfile']);
        }
      });
  }

  setMapType(mapTypeId: string) {
    this.googleMapService.setMapType(mapTypeId);
  }

  setCenter() {
    this.googleMapService.setCenter(this.latitude, this.longitude);
  }

  geocode(){
    this.googleMapService.geocode(this.address, this.getLocation);
  }
  getLocation(location){
    console.log(location);
  }
  findMe() {
    this.googleMapService.findMe();
  }

  trackMe() {
    this.googleMapService.trackMe();
  }

}
