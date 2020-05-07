import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupfarmerComponent } from './signupfarmer.component';

describe('SignupfarmerComponent', () => {
  let component: SignupfarmerComponent;
  let fixture: ComponentFixture<SignupfarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupfarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupfarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
