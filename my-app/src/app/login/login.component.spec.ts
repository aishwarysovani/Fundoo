import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should create', () => {
  expect(1 + 1).toBeTruthy(2);
});
it('should create', () => {
  expect(1 + 1).toBeTruthy(2);
});

  it('Form should be valid '), async(() => {
  expect(component.loginForm.controls['email'].setValue('aishsovani1234@gmail.com'));
  expect(component.loginForm.controls['password'].setValue('aishwarya'));
  expect(component.loginForm.controls['email']).toBeTruthy();
  expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('Invalid Form'), async(() => {
  expect(component.loginForm.controls['email'].setValue(''));
  expect(component.loginForm.controls['password'].setValue(''));
  expect(component.loginForm.controls['email']).toBeFalsy();
  expect(component.loginForm.controls['password']).toBeFalsy();
  });
});

