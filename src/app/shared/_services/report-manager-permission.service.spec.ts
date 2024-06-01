import { TestBed } from '@angular/core/testing';

import { ReportManagerPermissionService } from './report-manager-permission.service';

describe('ReportManagerPermissionService', () => {
  let service: ReportManagerPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportManagerPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
