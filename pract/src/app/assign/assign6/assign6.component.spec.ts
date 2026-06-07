import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assign6Component } from './assign6.component';

describe('Assign6Component', () => {
  let component: Assign6Component;
  let fixture: ComponentFixture<Assign6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Assign6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assign6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
