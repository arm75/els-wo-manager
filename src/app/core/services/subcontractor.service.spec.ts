import { TestBed } from '@angular/core/testing';

import { SubcontractorService } from './subcontractor.service';

describe('SubcontractorService', () => {
  let service: SubcontractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
