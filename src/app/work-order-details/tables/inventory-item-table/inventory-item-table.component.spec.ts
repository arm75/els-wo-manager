import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemTableComponent } from './inventory-item-table.component';

describe('InventoryItemTableComponent', () => {
  let component: InventoryItemTableComponent;
  let fixture: ComponentFixture<InventoryItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

