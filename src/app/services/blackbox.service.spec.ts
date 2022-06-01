import { TestBed } from '@angular/core/testing';

import { BlackboxService } from './blackbox.service';

describe('BlackboxService', () => {
  let service: BlackboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
