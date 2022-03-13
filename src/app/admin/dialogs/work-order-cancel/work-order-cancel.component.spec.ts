import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCancelComponent } from './work-order-cancel.component';

describe('WorkOrderCancelComponent', () => {
  let component: WorkOrderCancelComponent;
  let fixture: ComponentFixture<WorkOrderCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
