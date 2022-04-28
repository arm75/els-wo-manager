import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemCompleteComponent } from './subcontractor-item-complete.component';

describe('SubcontractorItemCompleteComponent', () => {
  let component: SubcontractorItemCompleteComponent;
  let fixture: ComponentFixture<SubcontractorItemCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
