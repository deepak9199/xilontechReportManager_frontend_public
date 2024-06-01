import { TestBed } from '@angular/core/testing';

import { TimeClcokService } from './time-clcok.service';

describe('TimeClcokService', () => {
  let service: TimeClcokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeClcokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
