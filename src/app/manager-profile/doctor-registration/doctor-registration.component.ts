import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { ManagerService } from '../../manager.service';
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css'],
  animations: [
    trigger('requests', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class DoctorRegistrationComponent implements OnInit {
  requests = [];
  constructor(private managerService : ManagerService) { }

  ngOnInit() {
    this.getRequest();
  }
  getRequest(){
    this.managerService.retrieveDoctorRequest()
      .subscribe(res=>{
        console.log(res.body['users']);
        this.requests = res.body['users'][0]['manager']['doctorRequest'];
      })
  }
  accept(id, i){
    console.log(id);
    this.managerService.acceptRequest(id)
      .subscribe(res=>{
        if(res.status == 200){
          this.requests.splice(i, 1);
        }
      })
  }
  deny(id, i) {
    this.managerService.denyRequest(id)
    .subscribe(res => {
      if (res.status == 200) {
        this.requests.splice(i, 1);
      }
    })
  }
}
