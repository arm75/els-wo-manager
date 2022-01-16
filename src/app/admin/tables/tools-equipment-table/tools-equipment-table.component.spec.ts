import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsEquipmentTableComponent } from './tools-equipment-table.component';

describe('ToolsEquipmentTableComponent', () => {
  let component: ToolsEquipmentTableComponent;
  let fixture: ComponentFixture<ToolsEquipmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsEquipmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsEquipmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
