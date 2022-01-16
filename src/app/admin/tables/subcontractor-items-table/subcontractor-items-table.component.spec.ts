import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemsTableComponent } from './subcontractor-items-table.component';

describe('SubcontractorItemsTableComponent', () => {
  let component: SubcontractorItemsTableComponent;
  let fixture: ComponentFixture<SubcontractorItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
