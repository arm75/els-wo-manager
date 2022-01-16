import { TestBed } from '@angular/core/testing';

import { ToolEquipmentItemService } from './tool-equipment-item.service';

describe('ToolEquipmentItemService', () => {
  let service: ToolEquipmentItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolEquipmentItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
