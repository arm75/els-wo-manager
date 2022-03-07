import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderUsersEditComponent } from './work-order-users-edit.component';

describe('WorkOrderUsersEditComponent', () => {
  let component: WorkOrderUsersEditComponent;
  let fixture: ComponentFixture<WorkOrderUsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderUsersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

