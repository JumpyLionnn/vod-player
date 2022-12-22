import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedNumberInputComponent } from './fixed-number-input.component';

describe('FixedNumberInputComponent', () => {
  let component: FixedNumberInputComponent;
  let fixture: ComponentFixture<FixedNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedNumberInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
