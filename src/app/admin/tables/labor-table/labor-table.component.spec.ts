import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborTableComponent } from './labor-table.component';

describe('LaborTableComponent', () => {
  let component: LaborTableComponent;
  let fixture: ComponentFixture<LaborTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
