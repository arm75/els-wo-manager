import { TestBed } from '@angular/core/testing';

import { LaborItemService } from './labor-item.service';

describe('LaborItemService', () => {
  let service: LaborItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaborItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
