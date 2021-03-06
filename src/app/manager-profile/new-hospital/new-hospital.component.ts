import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GoogleMapService } from '../../google-map.service';
import { HospitalService } from '../../hospital.service';
import { DepartementService } from '../../departement.service';

@Component({
  selector: 'app-new-hospital',
  templateUrl: './new-hospital.component.html',
  styleUrls: ['./new-hospital.component.css']
})
export class NewHospitalComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  constructor(private googleMapService: GoogleMapService, private hospitalService: HospitalService, private departementService: DepartementService, private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.googleMapService.init(this.gmapElement);
    this.createFormControls();
    this.createForm();
    this.dropdownSetup();
  }
  //Dropdown 
  selectedItems = [];
  dropdownSettings = {};
  department = [];
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  dropdownSetup(){
    this.departementService.getDepartements().
      subscribe(resp => {
        this.department = resp.body['departmentsToSend'];        
      })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'departmentId',
      textField: 'departmentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  /*End dropdown*/
  location: any;
  latitude: any;
  longitude: any;
  address: any;


  /*Form controls */
  responseBody;
  headers;
  myform: FormGroup;
  country: FormControl;
  city: FormControl;
  contact: FormControl;
  email: FormControl;
  name: FormControl;
  departmentControl: FormControl;
  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.contact = new FormControl('', Validators.required);
    this.country = new FormControl('');
    this.city = new FormControl('');
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.departmentControl = new FormControl('')
  }
  createForm() {
    this.myform = new FormGroup({
      city: this.city,
      country: this.country,
      name: this.name,
      contact: this.contact,
      email: this.email,
      departmentControl: this.departmentControl
    });
  }

  onSubmit() {
    if (this.location) {
      this.myform.value.lat = this.location.lat;
      this.myform.value.lng = this.location.lng;
    }
    this.hospitalService.newHospital(this.myform.value).
      subscribe(resp => {
        this.responseBody = resp.body;
        console.log(resp);
        if(resp.status == 200){
          this.router.navigate(['../myhospitals'], {relativeTo: this.activatedRoute});
        }
    })
  }
/*End form controls */
 
  /*Map controls */
  setMapType(mapTypeId: string) {
    this.googleMapService.setMapType(mapTypeId);
  }

  setCenter() {
    this.googleMapService.setCenter(this.latitude, this.longitude);
  }

  async geocode() {
    console.log(this.address)
    this.getLocation(await this.googleMapService.geocode(this.address));
  }
  getLocation(location) {
    this.location = {
      'lat': location.lat,
      'lng': location.lng
    }
  }
  async findMe() {
    this.getLocation(await this.googleMapService.findMe());
  }

  /*End Map controls*/
}
