import { TestBed,inject } from '@angular/core/testing';

import { ResetService } from './reset.service';

describe('ResetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetService = TestBed.get(ResetService);
    expect(service).toBeTruthy();
  });

  it('#service should return false after creation if any connection error', inject([ResetService], (service: ResetService) => {
    expect(service).toBeFalsy();
  }));

  it('should send the reset password request to the server', (done) => {
    done();
  });
});
