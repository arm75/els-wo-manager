import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorGroupTableComponent } from './subcontractor-group-table.component';

describe('SubcontractorGroupTableComponent', () => {
  let component: SubcontractorGroupTableComponent;
  let fixture: ComponentFixture<SubcontractorGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

