import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
  
  it('form should be invalid',async(() => {
    expect(component.registerForm.controls['Emailid'].setValue(''));
    expect(component.registerForm.controls['Password'].setValue(''));
    expect(component.registerForm.controls['username'].setValue('784'));
    expect(component.registerForm.controls['Phoneno'].setValue('jdsxcshAS'));

    

  }))

  it('valid Form'), async(() => {
    expect(component.registerForm.controls['Emailid'].setValue('aishsovani1234@gmail.com'));
    expect(component.registerForm.controls['Password'].setValue('aishwarya'));
    expect(component.registerForm.controls['username'].setValue('aishsovani'));
    expect(component.registerForm.controls['Phoneno'].setValue('9944225511'));
   
    });
});