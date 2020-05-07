import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddnewenterpriseComponent } from './adminaddnewenterprise.component';

describe('AdminaddnewenterpriseComponent', () => {
  let component: AdminaddnewenterpriseComponent;
  let fixture: ComponentFixture<AdminaddnewenterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddnewenterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddnewenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
