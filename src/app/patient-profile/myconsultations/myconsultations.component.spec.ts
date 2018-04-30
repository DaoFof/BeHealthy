import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconsultationsComponent } from './myconsultations.component';

describe('MyconsultationsComponent', () => {
  let component: MyconsultationsComponent;
  let fixture: ComponentFixture<MyconsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyconsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyconsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
