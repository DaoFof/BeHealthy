import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhospitalsComponent } from './myhospitals.component';

describe('MyhospitalsComponent', () => {
  let component: MyhospitalsComponent;
  let fixture: ComponentFixture<MyhospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
