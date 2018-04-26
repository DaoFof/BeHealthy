import { TestBed, inject } from '@angular/core/testing';

import { HospitalListService } from './hospital-list.service';

describe('HospitalListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HospitalListService]
    });
  });

  it('should be created', inject([HospitalListService], (service: HospitalListService) => {
    expect(service).toBeTruthy();
  }));
});
