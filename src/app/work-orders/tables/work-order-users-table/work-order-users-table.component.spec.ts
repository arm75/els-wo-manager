import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderUsersTableComponent } from './work-order-users-table.component';

describe('WorkOrderUsersTableComponent', () => {
  let component: WorkOrderUsersTableComponent;
  let fixture: ComponentFixture<WorkOrderUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderUsersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

