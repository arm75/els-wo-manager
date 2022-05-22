import { TestBed } from '@angular/core/testing';

import { SubcontractorGroupService } from './subcontractor-group.service';

describe('SubcontractorGroupService', () => {
  let service: SubcontractorGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcontractorGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
