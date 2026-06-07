import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinPhoneComponent } from './lin-phone.component';

describe('LinPhoneComponent', () => {
  let component: LinPhoneComponent;
  let fixture: ComponentFixture<LinPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinPhoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
