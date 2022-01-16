import { TestBed } from '@angular/core/testing';

import { ToolEquipmentService } from './tool-equipment.service';

describe('ToolEquipmentService', () => {
  let service: ToolEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
