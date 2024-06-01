import { TestBed } from '@angular/core/testing';

import { TimerProjectsService } from './timer-projects.service';

describe('TimerProjectsService', () => {
  let service: TimerProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
