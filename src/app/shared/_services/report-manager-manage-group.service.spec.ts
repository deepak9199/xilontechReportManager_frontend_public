import { TestBed } from '@angular/core/testing';

import { ReportManagerManageGroupService } from './report-manager-manage-group.service';

describe('ReportManagerManageGroupService', () => {
  let service: ReportManagerManageGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportManagerManageGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
