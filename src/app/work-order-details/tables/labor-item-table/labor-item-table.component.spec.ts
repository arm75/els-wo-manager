import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborItemTableComponent } from './labor-item-table.component';

describe('LaborItemTableComponent', () => {
  let component: LaborItemTableComponent;
  let fixture: ComponentFixture<LaborItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

