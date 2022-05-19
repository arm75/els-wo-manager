import { TestBed } from '@angular/core/testing';

import { GlobalProgressSpinnerService } from './global-progress-spinner.service';

describe('GlobalProgressSpinnerService', () => {
  let service: GlobalProgressSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalProgressSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
