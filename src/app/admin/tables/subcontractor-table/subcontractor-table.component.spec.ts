import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorTableComponent } from './subcontractor-table.component';

describe('SubcontractorTableComponent', () => {
  let component: SubcontractorTableComponent;
  let fixture: ComponentFixture<SubcontractorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

