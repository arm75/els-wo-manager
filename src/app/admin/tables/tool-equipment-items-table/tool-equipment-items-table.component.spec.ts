import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemsTableComponent } from './tool-equipment-items-table.component';

describe('ToolEquipmentItemsTableComponent', () => {
  let component: ToolEquipmentItemsTableComponent;
  let fixture: ComponentFixture<ToolEquipmentItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
