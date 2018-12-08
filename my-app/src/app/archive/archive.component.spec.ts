import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should unarchive', async(() => {
    expect(component.unarchive['isUnarchived']).toEqual(0)
    expect(component.unarchive['isUnarchived']).toBeTruthy();
  }));
  it('should not unarchive', async(() => {
    expect(component.unarchive['isUnarchived']).toEqual(1)
    expect(component.unarchive['isUnarchived']).toBeFalsy();
  }));
});