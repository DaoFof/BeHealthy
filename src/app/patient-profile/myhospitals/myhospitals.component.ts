import { Component, OnInit, TemplateRef  } from '@angular/core';
import {HospitalService} from '../../hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-myhospitals',
  templateUrl: './myhospitals.component.html',
  styleUrls: ['./myhospitals.component.css']
})
export class MyhospitalsComponent implements OnInit {
  hospitals;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private hospitalService: HospitalService, private router: Router, private r: ActivatedRoute) { }
  loading: boolean = true;
  ngOnInit() {
    this.getHospitals();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(id): void {
    //this.message = 'Confirmed!';
    this.hospitalService.deleteHospital(id)
      .subscribe(res=>{
        if(res.status == 200){
          window.location.reload();
        }
      })
    this.modalRef.hide();
  }

  decline(): void {
    //this.message = 'Declined!';
    this.modalRef.hide();
  }

  getHospitals(){
    this.hospitalService.listManagerHospital()
      .subscribe(res=>{
        this.loading = false;
        this.hospitals =  res.body['hospital'];
        console.log(this.hospitals);
      });
  }
  sendtoHospitaldetail(id){
    this.router.navigate([`../../hospital/${id}`], {relativeTo: this.r}) 
  }
  editPage(id){
    this.router.navigate([`../edithospital/${id}`], { relativeTo: this.r }) 
  }
}
