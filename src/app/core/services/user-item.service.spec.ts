import { TestBed } from '@angular/core/testing';

import { UserItemService } from './user-item.service';

describe('UserItemService', () => {
  let service: UserItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
