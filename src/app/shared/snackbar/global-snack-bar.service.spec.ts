import { TestBed } from '@angular/core/testing';

import { GlobalSnackBarService } from './global-snack-bar.service';

describe('GlobalSnackBarService', () => {
  let service: GlobalSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
