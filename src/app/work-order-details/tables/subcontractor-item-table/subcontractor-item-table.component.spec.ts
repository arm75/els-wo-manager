import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemTableComponent } from './subcontractor-item-table.component';

describe('SubcontractorItemTableComponent', () => {
  let component: SubcontractorItemTableComponent;
  let fixture: ComponentFixture<SubcontractorItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

