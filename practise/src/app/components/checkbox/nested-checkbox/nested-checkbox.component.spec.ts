import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedCheckboxComponent } from './nested-checkbox.component';

describe('NestedCheckboxComponent', () => {
  let component: NestedCheckboxComponent;
  let fixture: ComponentFixture<NestedCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
