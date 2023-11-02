import { TestBed } from '@angular/core/testing';

import { UserLoginStatusService } from './user-login-status.service';

describe('UserLoginStatusService', () => {
  let service: UserLoginStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
