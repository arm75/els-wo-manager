import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorGroupEditComponent } from './subcontractor-group-edit.component';

describe('SubcontractorGroupEditComponent', () => {
  let component: SubcontractorGroupEditComponent;
  let fixture: ComponentFixture<SubcontractorGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

