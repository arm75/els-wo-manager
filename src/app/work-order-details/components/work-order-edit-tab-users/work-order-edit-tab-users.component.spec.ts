import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderEditTabUsersComponent } from './work-order-edit-tab-users.component';

describe('WorkOrderEditTabUsersComponent', () => {
  let component: WorkOrderEditTabUsersComponent;
  let fixture: ComponentFixture<WorkOrderEditTabUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderEditTabUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderEditTabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
