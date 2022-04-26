import { TestBed } from '@angular/core/testing';

import { InventoryBucketService } from './inventory-bucket.service';

describe('InventoryBucketService', () => {
  let service: InventoryBucketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryBucketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
