import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseHospitalComponent } from './choose-hospital.component';

describe('ChooseHospitalComponent', () => {
  let component: ChooseHospitalComponent;
  let fixture: ComponentFixture<ChooseHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
