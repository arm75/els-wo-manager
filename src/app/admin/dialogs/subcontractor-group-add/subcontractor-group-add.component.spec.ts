import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorGroupAddComponent } from './subcontractor-group-add.component';

describe('SubcontractorGroupAddComponent', () => {
  let component: SubcontractorGroupAddComponent;
  let fixture: ComponentFixture<SubcontractorGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorGroupAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

