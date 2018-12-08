import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordComponent } from './resetpassword.component';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid',async(() => {
    expect(component.resetForm.controls['email'].setValue('@asd.dzf.asd'));
    expect(component.resetForm.controls['email'].setValue('4157752962'));
    expect(component.resetForm.controls['password'].setValue('rfgvfrgvgvbgv'));
    expect(component.resetForm.controls['password'].setValue('175263855'));
  }))

  it('valid Form'), async(() => {
    expect(component.resetForm.controls['email'].setValue('aishsovani1234@gmail.com'));
    expect(component.resetForm.controls['password'].setValue('aishwarya'));
   
    });
   
});