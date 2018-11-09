import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformregiComponent } from './conformregi.component';

describe('ConformregiComponent', () => {
  let component: ConformregiComponent;
  let fixture: ComponentFixture<ConformregiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConformregiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformregiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
