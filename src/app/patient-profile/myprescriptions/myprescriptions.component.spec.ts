import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprescriptionsComponent } from './myprescriptions.component';

describe('MyprescriptionsComponent', () => {
  let component: MyprescriptionsComponent;
  let fixture: ComponentFixture<MyprescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
