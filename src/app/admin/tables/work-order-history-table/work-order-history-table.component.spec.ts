import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderHistoryTableComponent } from './work-order-history-table.component';

describe('WorkOrderHistoryTableComponent', () => {
  let component: WorkOrderHistoryTableComponent;
  let fixture: ComponentFixture<WorkOrderHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
