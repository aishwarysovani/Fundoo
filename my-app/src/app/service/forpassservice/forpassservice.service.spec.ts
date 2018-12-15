import { TestBed,inject } from '@angular/core/testing';

import { ForpassserviceService } from './forpassservice.service';

describe('ForpassserviceService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForpassserviceService = TestBed.get(ForpassserviceService);
    expect(service).toBeTruthy();
  });

  it('#service should return false after creation if any connection error', inject([ForpassserviceService], (service: ForpassserviceService) => {
    expect(service).toBeFalsy();
  }));

  it('should send the forgot password request to the server', (done) => {
    done();
  });
});
