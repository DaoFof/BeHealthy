import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {GoogleMapService} from '../../google-map.service';
import {RegistrationService} from '../../registration.service';
import { FileUploadService } from '../../file-upload.service';
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
  responseBody;
  headers;
  fileToUpload : any;
  constructor(private googleMapService: GoogleMapService, private fileUploadService: FileUploadService, private registrationService: RegistrationService, private router: Router) { }

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
  }
  createForm() { 
    this.myform = new FormGroup({
      contact: this.contact,
      country: this.country,
      pan: this.pan,
      city: this.city
    });
  }
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.fileToUpload = event.target.files[0];
      reader.onload = (event:any) => {
        this.imgurl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  async addFile(){
    if(this.fileToUpload){
      var res = await this.fileUploadService.upload(this.fileToUpload);
      if (res.status == 502) {
        this.msg = 'Image upload error, please try again';
      }
    }
  }
  onSubmit(){
    console.log(this.myform.value);
    this.submitAttempt = true;
    if(this.myform.invalid){
      this.msg = "Please fill all above fields";
    }
    this.addFile();
    this.myform.value.lat = this.location.lat;
    this.myform.value.lng = this.location.lng;
    console.log(this.myform.value);
    this.registrationService.updateInfo(this.myform.value)
      .subscribe(resp=>{
        console.log(resp);
        this.responseBody =  resp.body['user'];
        if(resp.status == 200){
          if (this.responseBody.userType == 'Hospital Manager')this.router.navigate(['managerProfile'])
          else if (this.responseBody.userType == 'Patient') this.router.navigate(['patientProfile'])
          else
            this.router.navigate(['doctorProfile'])
        }
      });
  }

  setMapType(mapTypeId: string) {
    this.googleMapService.setMapType(mapTypeId);
  }

  setCenter() {
    this.googleMapService.setCenter(this.latitude, this.longitude);
  }

  async geocode(){
    this.getLocation(await this.googleMapService.geocode(this.address));
  }
  getLocation(location){
    this.location = {
      'lat': location.lat,
      'lng': location.lng
    }
  }
  async findMe() {
    this.getLocation(await this.googleMapService.findMe());
  }
}
