import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsOperatorComp } from './rxjs-operator-comp';

describe('RxjsOperatorComp', () => {
  let component: RxjsOperatorComp;
  let fixture: ComponentFixture<RxjsOperatorComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsOperatorComp],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsOperatorComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
