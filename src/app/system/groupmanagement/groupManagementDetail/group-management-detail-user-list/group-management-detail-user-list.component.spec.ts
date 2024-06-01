import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementDetailUserListComponent } from './group-management-detail-user-list.component';

describe('GroupManagementDetailUserListComponent', () => {
  let component: GroupManagementDetailUserListComponent;
  let fixture: ComponentFixture<GroupManagementDetailUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupManagementDetailUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupManagementDetailUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
