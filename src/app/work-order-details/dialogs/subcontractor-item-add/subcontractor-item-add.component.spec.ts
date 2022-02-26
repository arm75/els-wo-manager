import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemAddComponent } from './subcontractor-item-add.component';

describe('SubcontractorItemAddComponent', () => {
  let component: SubcontractorItemAddComponent;
  let fixture: ComponentFixture<SubcontractorItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

