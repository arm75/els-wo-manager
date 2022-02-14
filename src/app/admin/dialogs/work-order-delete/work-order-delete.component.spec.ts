import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderDeleteComponent } from './work-order-delete.component';

describe('WorkOrderDeleteComponent', () => {
  let component: WorkOrderDeleteComponent;
  let fixture: ComponentFixture<WorkOrderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

