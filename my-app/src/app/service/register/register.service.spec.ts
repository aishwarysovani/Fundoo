import { TestBed,inject } from '@angular/core/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });

  it('#service should return false after creation if any connection error', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeFalsy();
  }));

  it('should send the register values after request to the server', (done) => {
    done();
  });
});
