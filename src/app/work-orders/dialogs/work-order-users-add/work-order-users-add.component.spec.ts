import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderUsersAddComponent } from './work-order-users-add.component';

describe('WorkOrderUsersAddComponent', () => {
  let component: WorkOrderUsersAddComponent;
  let fixture: ComponentFixture<WorkOrderUsersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderUsersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderUsersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

