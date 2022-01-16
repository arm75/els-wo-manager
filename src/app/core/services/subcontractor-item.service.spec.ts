import { TestBed } from '@angular/core/testing';

import { SubcontractorItemService } from './subcontractor-item.service';

describe('SubcontractorItemService', () => {
  let service: SubcontractorItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractorItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
