import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorUI } from './calculator-ui';

describe('CalculatorUI', () => {
  let component: CalculatorUI;
  let fixture: ComponentFixture<CalculatorUI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorUI],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorUI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
