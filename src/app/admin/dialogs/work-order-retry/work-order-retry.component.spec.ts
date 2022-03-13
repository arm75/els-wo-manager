import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderRetryComponent } from './work-order-retry.component';

describe('WorkOrderRetryComponent', () => {
  let component: WorkOrderRetryComponent;
  let fixture: ComponentFixture<WorkOrderRetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderRetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
