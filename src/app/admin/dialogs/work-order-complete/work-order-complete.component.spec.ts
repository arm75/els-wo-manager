import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCompleteComponent } from './work-order-complete.component';

describe('WorkOrderCompleteComponent', () => {
  let component: WorkOrderCompleteComponent;
  let fixture: ComponentFixture<WorkOrderCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
