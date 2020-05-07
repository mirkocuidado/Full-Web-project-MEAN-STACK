import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupenterpriseComponent } from './signupenterprise.component';

describe('SignupenterpriseComponent', () => {
  let component: SignupenterpriseComponent;
  let fixture: ComponentFixture<SignupenterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupenterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
