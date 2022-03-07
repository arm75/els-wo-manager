import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentReturnTableComponent } from './tool-equipment-return-table.component';

describe('ToolEquipmentReturnTableComponent', () => {
  let component: ToolEquipmentReturnTableComponent;
  let fixture: ComponentFixture<ToolEquipmentReturnTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentReturnTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentReturnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
