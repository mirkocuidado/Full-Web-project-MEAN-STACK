import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddnewfarmerComponent } from './adminaddnewfarmer.component';

describe('AdminaddnewfarmerComponent', () => {
  let component: AdminaddnewfarmerComponent;
  let fixture: ComponentFixture<AdminaddnewfarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaddnewfarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddnewfarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
