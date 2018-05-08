import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { GoogleMapService } from '../../google-map.service';
import { HospitalService } from '../../hospital.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-choose-hospital',
  templateUrl: './choose-hospital.component.html',
  styleUrls: ['./choose-hospital.component.css']
})
export class ChooseHospitalComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  constructor(public authService: AuthService, public modalService: BsModalService, public googleMapService: GoogleMapService, public hospitalService: HospitalService,public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.googleMapService.init(this.gmapElement);
    this.getHospitals();
    this.createFormControls();
    this.createForm();
    this.dropdownSetup();
  }
  getHospitals(){
    this.hospitalService.listAllHospital().
      subscribe(res=>{
        this.hospitals = res.body['hospitals'];
      })
  }
  /*Modal */
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  goToHome(){
    this.modalRef.hide();
    this.logout();
  }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home'], {relativeTo: this.activatedRoute});
    window.location.reload();
  }
  /*End modal */
  /*To display*/
  displayItem(item){
    for (const hospital of this.hospitals) {
      if (item._id == hospital._id) {
        this.managerId = hospital.managerId
        this.name = hospital.name;
        this.country = hospital.country;
        this.city = hospital.city;
        this.email = hospital.email;
        this.googleMapService.mark(+hospital.lat, +hospital.lng)
      }
    }
  }
  managerId : String;
  name: String;
  country: String;
  city: String;
  email: String;
  /*End to display */
  //Dropdown 
  selectedItems = [];
  dropdownSettings = {};
  hospitals = [] ;
  department = [];
  onItemSelect(item: any) {
    this.displayItem(item);
    console.log(item);
  }
  onSelectAll(items: any) {
    this.displayItem(items[0]);
    console.log(items);
  }
  dropdownSetup() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  /*End dropdown*/
  /* Form control */

  myform: FormGroup;
  hospitalControl: FormControl;
  createFormControls() {
    this.hospitalControl = new FormControl('')
  }
  createForm() {
    this.myform = new FormGroup({
      hospitalControl: this.hospitalControl
    });
  }
  onSubmit(template) {
    this.hospitalService.doctorAddHospital(this.hospitalControl.value)
      .subscribe(res=>{
        //console.log(res);
        if (res.status == 200) {
          this.openModal(template);
        } else {
          console.log(res);
        }
      })
  }
}
