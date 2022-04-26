import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorCompletionTableComponent } from './subcontractor-completion-table.component';

describe('SubcontractorCompletionTableComponent', () => {
  let component: SubcontractorCompletionTableComponent;
  let fixture: ComponentFixture<SubcontractorCompletionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorCompletionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorCompletionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
