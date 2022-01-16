import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersTableComponent } from './work-orders-table.component';

describe('WorkOrdersTableComponent', () => {
  let component: WorkOrdersTableComponent;
  let fixture: ComponentFixture<WorkOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
