import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AGGrid } from './aggrid';

describe('AGGrid', () => {
  let component: AGGrid;
  let fixture: ComponentFixture<AGGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AGGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(AGGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
