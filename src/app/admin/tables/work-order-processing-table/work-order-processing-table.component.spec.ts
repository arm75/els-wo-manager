import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderProcessingTableComponent } from './work-order-processing-table.component';

describe('WorkOrderProcessingTableComponent', () => {
  let component: WorkOrderProcessingTableComponent;
  let fixture: ComponentFixture<WorkOrderProcessingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderProcessingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderProcessingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
