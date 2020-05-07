import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerallproductsComponent } from './workerallproducts.component';

describe('WorkerallproductsComponent', () => {
  let component: WorkerallproductsComponent;
  let fixture: ComponentFixture<WorkerallproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerallproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerallproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
