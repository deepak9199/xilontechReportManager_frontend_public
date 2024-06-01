import { TestBed } from '@angular/core/testing';

import { TimnerProjectAssineService } from './timner-project-assine.service';

describe('TimnerProjectAssineService', () => {
  let service: TimnerProjectAssineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimnerProjectAssineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
