import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrecordsComponent } from './myrecords.component';

describe('MyrecordsComponent', () => {
  let component: MyrecordsComponent;
  let fixture: ComponentFixture<MyrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
