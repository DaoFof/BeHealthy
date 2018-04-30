import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule, ModalModule, TooltipModule,CarouselModule,CollapseModule, PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, CarouselModule,CollapseModule,PaginationModule],
  declarations: []
})
export class BootstrapTwitterModule { }
