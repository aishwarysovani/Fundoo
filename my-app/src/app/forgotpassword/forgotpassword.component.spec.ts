import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordComponent } from './forgotpassword.component';

describe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', async(() => {
    expect(component.form.controls['email'].setValue('@asd.dzf.asd'));
    expect(component.form.controls['email'].setValue('123456789'));
    expect(component.form.controls['email'].setValue('avdfreikfj'));

  }))

  it('valid Form'), async(() => {
    expect(component.form.controls['email'].setValue('aishsovani1234@gmail.com'));

  });
});