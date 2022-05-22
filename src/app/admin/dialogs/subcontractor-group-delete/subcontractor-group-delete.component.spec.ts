import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorGroupDeleteComponent } from './subcontractor-group-delete.component';

describe('SubcontractorGroupDeleteComponent', () => {
  let component: SubcontractorGroupDeleteComponent;
  let fixture: ComponentFixture<SubcontractorGroupDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorGroupDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

