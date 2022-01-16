import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborItemsTableComponent } from './labor-items-table.component';

describe('LaborItemsTableComponent', () => {
  let component: LaborItemsTableComponent;
  let fixture: ComponentFixture<LaborItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
