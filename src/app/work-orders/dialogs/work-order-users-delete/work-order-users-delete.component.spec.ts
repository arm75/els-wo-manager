import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderUsersDeleteComponent } from './work-order-users-delete.component';

describe('WorkOrderUsersDeleteComponent', () => {
  let component: WorkOrderUsersDeleteComponent;
  let fixture: ComponentFixture<WorkOrderUsersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderUsersDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderUsersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

