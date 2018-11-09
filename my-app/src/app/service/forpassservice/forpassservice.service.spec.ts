import { TestBed } from '@angular/core/testing';

import { ForpassserviceService } from './forpassservice.service';

describe('ForpassserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForpassserviceService = TestBed.get(ForpassserviceService);
    expect(service).toBeTruthy();
  });
});
