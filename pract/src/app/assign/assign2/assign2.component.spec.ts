import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assign2Component } from './assign2.component';

describe('Assign2Component', () => {
  let component: Assign2Component;
  let fixture: ComponentFixture<Assign2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Assign2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assign2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
