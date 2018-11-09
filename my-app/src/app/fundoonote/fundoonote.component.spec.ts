import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundoonoteComponent } from './fundoonote.component';

describe('FundoonoteComponent', () => {
  let component: FundoonoteComponent;
  let fixture: ComponentFixture<FundoonoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundoonoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundoonoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
