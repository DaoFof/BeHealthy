import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhospitalComponent } from './myhospital.component';

describe('MyhospitalComponent', () => {
  let component: MyhospitalComponent;
  let fixture: ComponentFixture<MyhospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
