import { TestBed } from '@angular/core/testing';

import { InventoryGroupService } from './inventory-group.service';

describe('InventoryGroupService', () => {
  let service: InventoryGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
