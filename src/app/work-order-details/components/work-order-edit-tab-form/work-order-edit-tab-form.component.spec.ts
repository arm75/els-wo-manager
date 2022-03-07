import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderEditTabFormComponent } from './work-order-edit-tab-form.component';

describe('WorkOrderEditTabFormComponent', () => {
  let component: WorkOrderEditTabFormComponent;
  let fixture: ComponentFixture<WorkOrderEditTabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderEditTabFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderEditTabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
