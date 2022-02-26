import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemTableComponent } from './tool-equipment-item-table.component';

describe('ToolEquipmentItemTableComponent', () => {
  let component: ToolEquipmentItemTableComponent;
  let fixture: ComponentFixture<ToolEquipmentItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

