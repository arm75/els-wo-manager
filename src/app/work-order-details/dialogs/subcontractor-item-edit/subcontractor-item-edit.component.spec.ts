import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemEditComponent } from './subcontractor-item-edit.component';

describe('SubcontractorItemEditComponent', () => {
  let component: SubcontractorItemEditComponent;
  let fixture: ComponentFixture<SubcontractorItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

