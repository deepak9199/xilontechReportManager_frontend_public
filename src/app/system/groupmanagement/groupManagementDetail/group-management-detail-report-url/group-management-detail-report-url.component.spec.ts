import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementDetailReportUrlComponent } from './group-management-detail-report-url.component';

describe('GroupManagementDetailReportUrlComponent', () => {
  let component: GroupManagementDetailReportUrlComponent;
  let fixture: ComponentFixture<GroupManagementDetailReportUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupManagementDetailReportUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupManagementDetailReportUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
