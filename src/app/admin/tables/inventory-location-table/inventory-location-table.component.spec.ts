import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationTableComponent } from './inventory-location-table.component';

describe('InventoryLocationTableComponent', () => {
  let component: InventoryLocationTableComponent;
  let fixture: ComponentFixture<InventoryLocationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLocationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

