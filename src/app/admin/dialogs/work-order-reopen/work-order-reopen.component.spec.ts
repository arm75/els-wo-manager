import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderReopenComponent } from './work-order-reopen.component';

describe('WorkOrderReopenComponent', () => {
  let component: WorkOrderReopenComponent;
  let fixture: ComponentFixture<WorkOrderReopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderReopenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderReopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
