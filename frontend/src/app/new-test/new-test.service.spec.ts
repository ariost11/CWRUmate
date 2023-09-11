import { TestBed } from '@angular/core/testing';

import { NewTestService } from './new-test.service';

describe('NewTestService', () => {
  let service: NewTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
