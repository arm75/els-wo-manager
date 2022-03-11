import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCloseComponent } from './work-order-close.component';

describe('WorkOrderCloseComponent', () => {
  let component: WorkOrderCloseComponent;
  let fixture: ComponentFixture<WorkOrderCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
