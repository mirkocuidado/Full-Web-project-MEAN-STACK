import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerhomeComponent } from './workerhome.component';

describe('WorkerhomeComponent', () => {
  let component: WorkerhomeComponent;
  let fixture: ComponentFixture<WorkerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
