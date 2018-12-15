import { TestBed ,inject} from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('#isLoggedIn should return false after creation', inject([LoginService], (service: LoginService) => {
    expect(service.loggedIn()).toBeFalsy();
  }));

  it('should send the login request to the server', (done) => {
    done();
  });
  
});
