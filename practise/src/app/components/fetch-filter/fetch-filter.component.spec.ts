import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFilterComponent } from './fetch-filter.component';

describe('FetchFilterComponent', () => {
  let component: FetchFilterComponent;
  let fixture: ComponentFixture<FetchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
