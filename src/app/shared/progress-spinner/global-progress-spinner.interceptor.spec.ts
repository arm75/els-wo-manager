import { TestBed } from '@angular/core/testing';

import { GlobalProgressSpinnerInterceptor } from './global-progress-spinner.interceptor';

describe('GlobalProgressSpinnerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalProgressSpinnerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalProgressSpinnerInterceptor = TestBed.inject(GlobalProgressSpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
