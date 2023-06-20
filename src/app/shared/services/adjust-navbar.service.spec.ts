import { TestBed } from '@angular/core/testing';

import { AdjustNavbarService } from './adjust-navbar.service';

describe('AdjustNavbarService', () => {
  let service: AdjustNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
