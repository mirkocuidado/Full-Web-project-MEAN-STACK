import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfarmerComponent } from './editfarmer.component';

describe('EditfarmerComponent', () => {
  let component: EditfarmerComponent;
  let fixture: ComponentFixture<EditfarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
