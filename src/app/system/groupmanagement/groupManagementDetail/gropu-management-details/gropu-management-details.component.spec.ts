import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GropuManagementDetailsComponent } from './gropu-management-details.component';

describe('GropuManagementDetailsComponent', () => {
  let component: GropuManagementDetailsComponent;
  let fixture: ComponentFixture<GropuManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GropuManagementDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GropuManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
