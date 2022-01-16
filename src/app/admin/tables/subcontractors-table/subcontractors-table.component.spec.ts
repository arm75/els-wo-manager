import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorsTableComponent } from './subcontractors-table.component';

describe('SubcontractorsTableComponent', () => {
  let component: SubcontractorsTableComponent;
  let fixture: ComponentFixture<SubcontractorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
