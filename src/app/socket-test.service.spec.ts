import { TestBed, inject } from '@angular/core/testing';

import { SocketTestService } from './socket-test.service';

describe('SocketTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketTestService]
    });
  });

  it('should be created', inject([SocketTestService], (service: SocketTestService) => {
    expect(service).toBeTruthy();
  }));
});
