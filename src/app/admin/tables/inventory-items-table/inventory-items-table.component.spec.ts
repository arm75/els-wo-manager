import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemsTableComponent } from './inventory-items-table.component';

describe('InventoryItemsTableComponent', () => {
  let component: InventoryItemsTableComponent;
  let fixture: ComponentFixture<InventoryItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
