import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminallclientsComponent } from './adminallclients.component';

describe('AdminallclientsComponent', () => {
  let component: AdminallclientsComponent;
  let fixture: ComponentFixture<AdminallclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminallclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminallclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
