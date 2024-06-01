import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementListComponent } from './group-management-list.component';

describe('GroupManagementListComponent', () => {
  let component: GroupManagementListComponent;
  let fixture: ComponentFixture<GroupManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupManagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
