import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assign8Component } from './assign8.component';

describe('Assign8Component', () => {
  let component: Assign8Component;
  let fixture: ComponentFixture<Assign8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Assign8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assign8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
