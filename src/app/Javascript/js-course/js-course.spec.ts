import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCourse } from './js-course';

describe('JsCourse', () => {
  let component: JsCourse;
  let fixture: ComponentFixture<JsCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsCourse],
    }).compileComponents();

    fixture = TestBed.createComponent(JsCourse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
