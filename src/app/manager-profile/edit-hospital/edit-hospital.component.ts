import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GoogleMapService } from '../../google-map.service';
import { HospitalService } from '../../hospital.service';
import { DepartementService } from '../../departement.service';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css','../new-hospital/new-hospital.component.css']
})
export class EditHospitalComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  constructor(private googleMapService: GoogleMapService, private hospitalService: HospitalService, private departementService: DepartementService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {
    this.googleMapService.init(this.gmapElement);
    this.getHospital();
    this.dropdownSetup();
  }

  getHospital() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.hospitalService.getHospital(id)
      .subscribe(res=>{
        let hospital = res.body['hospital'];
        this.selectedItems = res.body['hospital']['departments'];
        this.name.setValue(hospital['name']);
        this.myform.setValue({
          city: hospital['city'],
          country: hospital['country'],
          name: hospital['name'],
          contact: hospital['contact'],
          email: hospital['email'],
          departmentControl: hospital['departments']
        });
        this.myFormDup = this.myform.value;
        this.location ={
          'lat': hospital['lat'],
          'lng': hospital['lng']
        } 
        this.googleMapService.mark(+hospital['lat'], +hospital['lng'])
      });
  }
  hospitalToEdit;
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
  dropdownSetup() {
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
  myFormDup;
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.location) {
      this.myform.value.lat = this.location.lat;
      this.myform.value.lng = this.location.lng;
    }
    this.hospitalService.updateHospital(id,this.myform.value).
      subscribe(resp => {
        this.responseBody = resp.body;
        console.log(resp);
        if (resp.status == 200) {
          this.router.navigate(['managerProfile/myhospitals']);
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
