import { AppRoutingModule } from './app-routing.module';
import {RouterTestingModule} from '@angular/router/testing'

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});

imports: [ 
  RouterTestingModule 
] ;

