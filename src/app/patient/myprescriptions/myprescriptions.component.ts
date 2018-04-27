import { Component, OnInit,HostBinding } from '@angular/core';
import { slideInDownAnimation }   from '../../animations';

@Component({
  selector: 'app-myprescriptions',
  templateUrl: './myprescriptions.component.html',
  styleUrls: ['./myprescriptions.component.css'],
  animations:[slideInDownAnimation]
})
export class MyprescriptionsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;  
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor() { }

  ngOnInit() {
  }

}
