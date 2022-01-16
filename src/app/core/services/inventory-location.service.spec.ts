import { TestBed } from '@angular/core/testing';

import { InventoryLocationService } from './inventory-location.service';

describe('InventoryLocationService', () => {
  let service: InventoryLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
