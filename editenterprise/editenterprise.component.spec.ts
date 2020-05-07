import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditenterpriseComponent } from './editenterprise.component';

describe('EditenterpriseComponent', () => {
  let component: EditenterpriseComponent;
  let fixture: ComponentFixture<EditenterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditenterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
