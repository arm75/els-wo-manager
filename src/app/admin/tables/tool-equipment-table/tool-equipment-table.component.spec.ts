import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentTableComponent } from './tool-equipment-table.component';

describe('ToolEquipmentTableComponent', () => {
  let component: ToolEquipmentTableComponent;
  let fixture: ComponentFixture<ToolEquipmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

