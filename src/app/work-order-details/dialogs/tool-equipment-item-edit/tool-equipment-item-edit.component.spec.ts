import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemEditComponent } from './tool-equipment-item-edit.component';

describe('ToolEquipmentItemEditComponent', () => {
  let component: ToolEquipmentItemEditComponent;
  let fixture: ComponentFixture<ToolEquipmentItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

