import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGroupsTableComponent } from './inventory-groups-table.component';

describe('InventoryGroupsTableComponent', () => {
  let component: InventoryGroupsTableComponent;
  let fixture: ComponentFixture<InventoryGroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryGroupsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
