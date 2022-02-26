import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemDeleteComponent } from './subcontractor-item-delete.component';

describe('SubcontractorItemDeleteComponent', () => {
  let component: SubcontractorItemDeleteComponent;
  let fixture: ComponentFixture<SubcontractorItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorItemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

