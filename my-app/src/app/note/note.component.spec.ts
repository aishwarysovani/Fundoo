import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should note', async(()=>{
    expect(component.archive['archive']).toEqual(0);
    expect(component.deletenote['deleted']).toEqual(0)
    expect(component.archive['archive']).toBeTruthy();
    expect(component.deletenote['deleted']).toBeTruthy();
  }));
  it('should not note', async(()=>{
    expect(component.archive['archive']).toEqual(1);
    expect(component.deletenote['deleted']).toEqual(1)
    expect(component.archive['archive']).toBeFalsy();
    expect(component.deletenote['deleted']).toBeFalsy();
  }));

  it('should note', async(()=>{
    expect(component.takenote['title']).toEqual('yghss');
    expect(component.takenote['note']).toEqual('hszxna')
    expect(component.takenote['title']).toBeTruthy();
    expect(component.takenote['note']).toBeTruthy();
  }));
});
