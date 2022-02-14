import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGroupTableComponent } from './inventory-group-table.component';

describe('InventoryGroupTableComponent', () => {
  let component: InventoryGroupTableComponent;
  let fixture: ComponentFixture<InventoryGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryGroupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

