import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinComponent } from './bin.component';

describe('BinComponent', () => {
  let component: BinComponent;
  let fixture: ComponentFixture<BinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should deleted', async(() => {
    expect(component.deleteforever['isDeleted']).toEqual(1)
    expect(component.deleteforever['isDeleted']).toBeTruthy();
  }));
  it('should not deleted', async(() => {
    expect(component.deleteforever['isDeleted']).toEqual(0)
    expect(component.deleteforever['isDeleted']).toBeFalsy();
  }));
});