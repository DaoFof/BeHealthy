import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule, ModalModule, TooltipModule,CarouselModule,CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, CarouselModule,CollapseModule],
  declarations: []
})
export class BootstrapTwitterModule { }
