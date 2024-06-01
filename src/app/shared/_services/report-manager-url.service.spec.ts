import { TestBed } from '@angular/core/testing';

import { ReportManagerUrlService } from './report-manager-url.service';

describe('ReportManagerUrlService', () => {
  let service: ReportManagerUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportManagerUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
