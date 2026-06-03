import { TestBed } from '@angular/core/testing';

import { OperatorsCheckService } from './operators-check-service';

describe('OperatorsCheckService', () => {
  let service: OperatorsCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorsCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
