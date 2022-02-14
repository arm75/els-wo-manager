import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorDeleteComponent } from './subcontractor-delete.component';

describe('SubcontractorDeleteComponent', () => {
  let component: SubcontractorDeleteComponent;
  let fixture: ComponentFixture<SubcontractorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

