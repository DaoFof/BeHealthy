import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { HospitalService } from '../../../hospital.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  animations: [
    trigger('requests', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('500ms', [
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
export class AppointmentsComponent implements OnInit {

  constructor(private hospitalService: HospitalService) { }
  requests = [];
  ngOnInit() {
    this.hospitalService.getPatientAppointement()
      .subscribe(res => {
        this.requests = res.body['appoints'];

        console.log(this.requests);
      })
  }

  getDate(timestamp) {
    return new Date(timestamp).toUTCString().substring(0, 25);
  }
  createName(user) {
    return user.firstName + ' ' + user.lastName;
  }
}
