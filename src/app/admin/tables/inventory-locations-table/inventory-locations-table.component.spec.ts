import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationsTableComponent } from './inventory-locations-table.component';

describe('InventoryLocationsTableComponent', () => {
  let component: InventoryLocationsTableComponent;
  let fixture: ComponentFixture<InventoryLocationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLocationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
