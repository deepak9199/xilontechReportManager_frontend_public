import { TestBed } from '@angular/core/testing';

import { TimerActivitiesService } from './timer-activities.service';

describe('TimerActivitiesService', () => {
  let service: TimerActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
