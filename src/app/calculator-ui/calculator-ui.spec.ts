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

  // write test case for addition operation
  it('should perform addition operation', () => {
    component.currentInput = '2+3';
    component.calculate();
    expect(component.currentInput).toEqual('5');
  });

  // how to run only this component test case
  // npx ng test --include src/app/calculator-ui/calculator-ui.spec.ts

});
