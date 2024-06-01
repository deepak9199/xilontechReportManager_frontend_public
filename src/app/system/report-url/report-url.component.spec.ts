import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUrlComponent } from './report-url.component';

describe('ReportUrlComponent', () => {
  let component: ReportUrlComponent;
  let fixture: ComponentFixture<ReportUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
