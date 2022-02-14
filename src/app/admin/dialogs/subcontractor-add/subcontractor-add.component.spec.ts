import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorAddComponent } from './subcontractor-add.component';

describe('SubcontractorAddComponent', () => {
  let component: SubcontractorAddComponent;
  let fixture: ComponentFixture<SubcontractorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

