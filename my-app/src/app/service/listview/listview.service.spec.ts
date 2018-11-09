import { TestBed } from '@angular/core/testing';

import { ListviewService } from './listview.service';

describe('ListviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListviewService = TestBed.get(ListviewService);
    expect(service).toBeTruthy();
  });
});
