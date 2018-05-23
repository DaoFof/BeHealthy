import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { UserService } from '../../../user.service';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class AppointmentSchedulerComponent implements OnInit {

  constructor(private atp: AmazingTimePickerService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }
  
  public invalidMoment = new Date(2018, 1, 11, 9, 30);
  public min = new Date(new Date().getTime() - 86400);
  //public max = new Date(2018, 3, 21, 20, 30);
  public selectedMoment = new Date();

  ngOnInit() {
    this.getDoctor();
    this.createFormControls();
    this.createForm();
  }
  /*Get Doctor */
  hosId ;
  doctor ;
  async getDoctor(){
    const docId = this.route.snapshot.paramMap.get('docId');
    this.hosId = this.route.snapshot.paramMap.get('hosId');
    var res = await this.userService.getDoctorDup(docId);
    this.doctor = res.body.users;
    console.log(this.doctor);
  }
  /*End */

  /*Time picker */
  public selectedTime: string;
  openTimePicker() {
    const amazingTimePicker = this.atp.open({
      theme: 'dark',
      arrowStyle: { 'background': 'red', 'color': 'white' }
    });
    amazingTimePicker.afterClose().subscribe()
    amazingTimePicker.afterClose().subscribe(time => {
      this.time.setValue(time)
    });
  }
  /*End time picker */
  /*Form control */
  myform: FormGroup;
  date: FormControl;
  time: FormControl;
  remark: FormControl;
  status: FormControl
  createFormControls() {
    this.date = new FormControl(new Date(), Validators.required);
    //this.time = new FormControl('', Validators.required);
    this.remark = new FormControl('', Validators.required);
    this.status = new FormControl('');
  }
  createForm() {
    this.myform = new FormGroup({
      date: this.date,
      //time: this.time,
      remark: this.remark,
      status: this.status
    });
  }
  onSubmit() {
    console.log(this.myform.value);
    console.log(new Date(this.myform.value.date).getTime());
    console.log(new Date(new Date(this.myform.value.date).getTime()));
    
  }
}
