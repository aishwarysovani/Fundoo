import { TestBed ,inject,async} from '@angular/core/testing';

import { NoteService } from './note.service';

describe('NoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });

  it('#service should return false after creation if any connection error', inject([NoteService], (service: NoteService) => {
    expect(service).toBeFalsy();
  }));

  it('should send the register values after request to the server', (done) => {
    done();
  });

  it('#fetchUserData should return true after creation', inject([NoteService], (service: NoteService) => {
    expect(service.fetchUserData()).toBeTruthy();
  }));

  it('should data return valid', () => {
    const serviceS: NoteService = TestBed.get(NoteService);
    expect(serviceS.fetchUserData).toEqual('aishsovani1234@gmail.com');
    expect(serviceS).toBeTruthy();
  });

  it('should data return invalid', () => {
    const serviceS: NoteService = TestBed.get(NoteService);
    expect(serviceS.fetchUserData).toEqual('dfchkdhk');
    expect(serviceS.fetchUserData).toEqual('684636363696');
    expect(serviceS.fetchUserData).toEqual('edfdsfv856346');
    expect(serviceS).toBeFalsy();
  });
});
